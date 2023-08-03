import { useState, useCallback } from "react";
import { Box, Button, Modal, Input } from "@components";
import cx from "classnames";
import { css } from "@emotion/css";
import Image from "next/image";
import { defaultImage } from "@/libs/utils/default-image";
import { useCollection } from "@libs/hooks/collections";
import { useCollections } from "@libs/contexts/collection";
import Link from "next/link";
import { CollectionType } from "@libs/utils/type";

interface CollectionCardProps {
  data: CollectionType;
}

const CollectionCard = ({ data }: CollectionCardProps) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const { collections } = useCollections();
  const { deleteCollection, updateCollection } = useCollection();
  const [isOpenCollectionModal, setIsOpenCollectionModal] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editCollection, setEditCollection] = useState<string>();
  const handleNameChange = (value: string) => {
    if (!value) {
      setErrorMessage(`Please insert name of collection`);
      return;
    }
    if (/[^a-zA-Z\d\s:]/.test(value)) {
      setErrorMessage(
        `Please don't use special characters in the collection name`
      );
      return;
    }
    if (
      collections?.some((x: CollectionType) => x.name === value) &&
      value !== data?.name
    ) {
      setErrorMessage(`Name has been used`);
      return;
    }
    setEditCollection(value);
    setErrorMessage("");
  };
  const onSubmit = useCallback(async () => {
    if (editCollection) {
      updateCollection({
        collectionID: data?.id,
        name: editCollection,
      });
      setIsOpenCollectionModal(false);
    }
  }, [editCollection]);
  return (
    <>
      <Link
        className={css`
          text-decoration: none;
        `}
        href={`/collections/${data?.slug}`}
      >
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
                aspect-ratio: 16/5;
                img {
                  object-fit: fill;
                  border-top-left-radius: 12px;
                  border-top-right-radius: 12px;
                }
              `
            )}
          >
            {data?.listAnime?.at(0)?.bannerImage ? (
              <Image
                src={data?.listAnime?.at(0)?.bannerImage}
                alt="1"
                layout="fill"
              />
            ) : (
              <Image src={defaultImage?.banner} alt="1" layout="fill" />
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
                  height: 140px;
                  width: 100%;
                  transition-property: all;
                  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                  transition-duration: 300ms;
                  text-decoration: none !important;
                `,
                "card__body"
              )}
            >
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
                {data?.name}
              </Box>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpenDeleteModal(true);
                }}
                className={css`
                  margin-top: 20px;
                  margin-right: 10px;
                `}
                type="danger"
              >
                Remove
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpenCollectionModal(true);
                }}
              >
                Edit Collection
              </Button>
            </Box>
          </Box>
        </Box>
      </Link>
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
              {data?.name}
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
                deleteCollection(data?.id);
                setIsOpenDeleteModal(false);
              }}
              type="danger"
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        isOpen={isOpenCollectionModal}
        setIsOpen={setIsOpenCollectionModal}
      >
        <Box
          className={cx(css`
            width: 90vw;
            max-width: 600px;
            height: fit-content;
            background: #fcfcfc;
            color: black;
            padding: 24px;
            overflow: auto;
            border-radius: 8px;
          `)}
        >
          <Box
            onClick={() => setIsOpenCollectionModal(false)}
            className={css`
              text-align: right;
              margin-bottom: 10px;
              cursor: pointer;
            `}
          >
            X
          </Box>
          <Box>
            <Box>
              <Input
                label="Name"
                defaultValue={data?.name}
                onChange={(e) => handleNameChange(e.target.value)}
                errorMessage={errorMessage}
              />
            </Box>
            <Button
              className={css`
                margin-top: 10px;
              `}
              onClick={() => !errorMessage && onSubmit()}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CollectionCard;
