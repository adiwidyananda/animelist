import { Box, Button, Modal } from "@components";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { css } from "@emotion/css";
import cx from "classnames";
import { Anime, CollectionType } from "@libs/utils/type";
import { defaultImage } from "@/libs/utils/default-image";
import { useCollection } from "@libs/hooks/collections";
import { useCollections } from "@libs/contexts/collection";

interface CardProps {
  data: Anime;
  redirect?: boolean;
  showRemove?: boolean;
  collectionID?: string;
}

const Card = ({
  data,
  redirect = true,
  showRemove,
  collectionID,
}: CardProps) => {
  const { collections } = useCollections();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const { removeAnime } = useCollection();
  const CardWrapper = () => {
    return (
      <>
        <Box
          className={cx(
            "card",
            css`
              cursor: pointer;
              transition-property: all;
              transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              transition-duration: 300ms;
              background: #141217;
              border-radius: 12px;
              color: white;
              &:hover .card__body {
                transition-property: all;
                transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                transition-duration: 300ms;
                padding-top: 20px;
                background: rgb(26, 39, 82);
              }
              &:hover .card__body__description {
                transition-property: all;
                transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                transition-duration: 300ms;
                color: white;
              }
              &:hover .card__body__extra {
                transition-property: all;
                transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                transition-duration: 300ms;
                color: white;
              }
            `
          )}
        >
          <div
            className={cx(
              "card__image",
              css`
                position: relative;
                aspect-ratio: 16/14;
                img {
                  object-fit: fill;
                  border-top-left-radius: 12px;
                  border-top-right-radius: 12px;
                }
              `
            )}
          >
            {data?.coverImage?.large ? (
              <Image src={data?.coverImage?.large} alt="1" layout="fill" />
            ) : (
              <Image src={defaultImage?.card} alt="1" layout="fill" />
            )}
          </div>
          <Box
            className={cx(
              css`
                width: 100%;
                display: flex;
                align-items: center;
              `,
              "card__wrapper"
            )}
          >
            <Box
              className={cx(
                css`
                  padding: 30px;
                  padding-bottom: 0px;
                  width: 100%;
                  height: ${showRemove ? "240px" : "180px"};
                  transition-property: all;
                  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                  transition-duration: 300ms;
                  text-decoration: none !important;
                `,
                "card__body"
              )}
            >
              <Box
                className={cx(
                  css`
                    display: flex;
                    justify-content: space-between;
                    font-weight: 400;
                    font-size: 14px;
                  `,
                  ""
                )}
              >
                <Box className="">
                  Release:{" "}
                  <span
                    className={cx(
                      css`
                        color: rgb(103, 102, 110);
                        transition-property: all;
                        transition-timing-function: cubic-bezier(
                          0.4,
                          0,
                          0.2,
                          1
                        );
                        transition-duration: 300ms;
                      `,
                      "card__body__extra"
                    )}
                  >
                    {data?.startDate?.year}
                  </span>
                </Box>
                <Box className="">
                  Score:{" "}
                  <span
                    className={cx(
                      css`
                        color: rgb(103, 102, 110);
                        transition-property: all;
                        transition-timing-function: cubic-bezier(
                          0.4,
                          0,
                          0.2,
                          1
                        );
                        transition-duration: 300ms;
                      `,
                      "card__body__extra"
                    )}
                  >
                    {data?.averageScore / 10}
                  </span>
                </Box>
              </Box>
              <Box
                className={cx(css`
                  font-size: 24px;
                  font-weight: 500;
                  margin-top: 16px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                `)}
              >
                {data?.title?.romaji}
              </Box>
              <div
                className={cx(
                  css`
                    font-size: 16px;
                    font-weight: 400;
                    margin-top: 12px;
                    overflow: hidden;
                    color: rgb(103, 102, 110);
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    transition-property: all;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                    transition-duration: 300ms;
                  `,
                  "card__body__description"
                )}
                dangerouslySetInnerHTML={{ __html: data?.description }}
              ></div>
              {showRemove && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpenDeleteModal(true);
                  }}
                  className={css`
                    margin-top: 20px;
                  `}
                  type="danger"
                  fullWidth
                >
                  Remove
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </>
    );
  };
  return (
    <>
      {redirect ? (
        <Link
          href={`/anime/${data?.id}`}
          className={cx(
            css`
              text-decoration: none;
            `
          )}
        >
          <CardWrapper />
        </Link>
      ) : (
        <CardWrapper />
      )}
      <Modal isOpen={isOpenDeleteModal} setIsOpen={setIsOpenDeleteModal}>
        <Box
          className={css`
            width: 90vw;
            max-width: 600px;
            height: fit-content;
            background: #fcfcfc;
            color: black;
            padding: 24px;
            overflow: auto;
            border-radius: 8px;
          `}
        >
          <Box
            onClick={() => setIsOpenDeleteModal(false)}
            className={css`
              text-align: right;
              margin-bottom: 10px;
              cursor: pointer;
            `}
          >
            X
          </Box>
          <Box
            className={css`
              text-align: center;
              font-size: 20px;
            `}
          >
            Are you sure to remove{" "}
            <span
              className={css`
                font-weight: bold;
              `}
            >
              {data?.title?.romaji}
            </span>{" "}
            from{" "}
            <span
              className={css`
                font-weight: bold;
              `}
            >
              {
                collections?.find((x: CollectionType) => x?.id === collectionID)
                  ?.name
              }
            </span>{" "}
            collection ?
          </Box>
          <Box
            className={css`
              display: flex;
              justify-content: center;
              gap: 12px;
              margin-top: 20px;
            `}
          >
            <Button onClick={() => setIsOpenDeleteModal(false)}>Cancel</Button>
            <Button
              onClick={() => {
                removeAnime({ collectionID, animeID: data?.id });
                setIsOpenDeleteModal(false);
              }}
              type="danger"
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Card;
