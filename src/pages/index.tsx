import {
  Box,
  Container,
  Layout,
  Card,
  Button,
  SVGSpinner,
  Input,
  Modal,
  Checkbox,
  Select,
  Head,
} from "@components";
import { css } from "@emotion/css";
import cx from "classnames";
import { useCallback, useEffect, useState } from "react";
import { useAnimeList } from "@libs/hooks/anime";
import { useCollections } from "@libs/contexts/collection";
import { Anime } from "@libs/utils/type";
import { useCollection } from "@libs/hooks/collections";
import { CollectionType } from "@libs/utils/type";
import { defaultImage } from "@/libs/utils/default-image";

const Page = () => {
  const { collections } = useCollections();
  const { createCollection, addManyAnime } = useCollection();
  //pagination function
  const { data, loading, hasNextPage, currentPage, getData } = useAnimeList();
  const handleNextPage = useCallback(() => {
    getData(currentPage + 1);
  }, [currentPage]); //eslint-disable-line
  //pagination function

  // Create first collection function
  const [isOpenCollectionModal, setIsOpenCollectionModal] =
    useState<boolean>(false);
  const [newCollection, setNewCollection] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    getData(currentPage + 1);
  }, []);
  const onSubmit = useCallback(async () => {
    if (newCollection) {
      createCollection(newCollection);
      setIsOpenCollectionModal(false);
      setShowCheckbox(true);
    }
  }, [newCollection]);
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
    if (collections?.some((x: CollectionType) => x.name === value)) {
      setErrorMessage(`Name has been used`);
      return;
    }
    setNewCollection(value);
    setErrorMessage("");
  };
  //create first collection function

  //checked function
  const [showCheckbox, setShowCheckbox] = useState<boolean>(false);
  const [checkedAnime, setCheckedAnime] = useState<Anime[]>([]);
  const onClickCollectionButton = useCallback(() => {
    if (collections?.length > 0) {
      setShowCheckbox(true);
    } else {
      setIsOpenCollectionModal(true);
    }
  }, [collections]);
  const handleCheckboxChange = useCallback(
    (value: Anime) => {
      if (checkedAnime?.some((x: Anime) => x?.id === value?.id)) {
        const newCheckedAnime = checkedAnime?.filter(
          (x: Anime) => x.id !== value?.id
        );
        setCheckedAnime(newCheckedAnime);
      } else {
        setCheckedAnime(checkedAnime.concat(value));
      }
    },
    [checkedAnime]
  );
  //checked function

  //Add Anime function
  const [openAddAnimeModal, setOpenAddAnimeModal] = useState<boolean>(false);
  const [collectionID, setCollectionID] = useState<string>(
    collections?.[0]?.id
  );
  useEffect(() => {
    setCollectionID(collections?.[0]?.id);
  }, [collections]);
  const [addedAnime, setAddedAnime] = useState<Anime[]>([]);
  const addButtonHandler = useCallback(() => {
    const collectionAnimeID = collections
      ?.find((collection: CollectionType) => collection?.id === collectionID)
      ?.listAnime?.map((anime: Anime) => anime?.id);
    const newAddedAnime = checkedAnime?.filter(
      (checked: Anime) => !collectionAnimeID?.includes(checked?.id)
    );
    setAddedAnime(newAddedAnime);
  }, [collectionID, collections, checkedAnime]);
  useEffect(() => {
    const collectionAnimeID = collections
      ?.find((collection: CollectionType) => collection?.id === collectionID)
      ?.listAnime?.map((anime: Anime) => anime?.id);
    const newAddedAnime = checkedAnime?.filter(
      (checked: Anime) => !collectionAnimeID?.includes(checked?.id)
    );
    setAddedAnime(newAddedAnime);
  }, [collectionID]);
  const onAddManyAnime = useCallback(async () => {
    await addManyAnime({
      collectionID: collectionID,
      anime: addedAnime,
    });
    setOpenAddAnimeModal(false);
    setShowCheckbox(false);
  }, [collectionID, addedAnime]);
  //Add Anime function
  return (
    <Container>
      <Box
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 22px;
          margin-bottom: 24px;
          @media only screen and (max-width: 600px) {
            display: block;
          }
        `}
      >
        <Box
          className={css`
            margin-top: 22px;
            font-size: 36px;
            border-radius: 4px;
            color: white;
            font-weight: 700;
            margin-bottom: 24px;
          `}
        >
          Anime List
        </Box>
        {showCheckbox ? (
          <Box
            className={css`
              display: flex;
              align-items: center;
              gap: 8px;
            `}
          >
            <Button
              type="danger"
              onClick={() => {
                setShowCheckbox(false);
                setCheckedAnime([]);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                addButtonHandler();
                setOpenAddAnimeModal(true);
              }}
            >
              Add
            </Button>
          </Box>
        ) : (
          <Button onClick={() => onClickCollectionButton()}>
            Add To Collection
          </Button>
        )}
      </Box>
      <Box
        className={cx(css`
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 1rem;
        `)}
      >
        {data?.map((anime: Anime, index: number) => (
          <Box
            key={index}
            className={cx(css`
              grid-column: span 4 / span 4;
              @media only screen and (max-width: 1000px) {
                grid-column: span 6 / span 6;
              }
              @media only screen and (max-width: 600px) {
                grid-column: span 12 / span 12;
              }
            `)}
          >
            {showCheckbox && (
              <Checkbox
                handleChange={() => handleCheckboxChange(anime)}
                isChecked={checkedAnime?.some(
                  (x: Anime) => x?.id === anime?.id
                )}
              />
            )}

            <Card data={anime} redirect={!showCheckbox} />
          </Box>
        ))}
      </Box>
      <Box
        className={cx(css`
          display: flex;
          height: 200px;
          justify-content: center;
          align-items: center;
        `)}
      >
        {loading ? (
          <SVGSpinner />
        ) : (
          <>
            {hasNextPage && (
              <Button onClick={() => handleNextPage()}>Load More</Button>
            )}
          </>
        )}
      </Box>
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
            <Box
              className={css`
                font-weight: 700;
                margin-bottom: 20px;
              `}
            >
              Create your first collection
            </Box>
            <Box>
              <Input
                label="Name"
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
              create
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal isOpen={openAddAnimeModal} setIsOpen={setOpenAddAnimeModal}>
        <Box
          className={css`
            width: 90vw;
            max-width: 600px;
            height: 80vh;
            background: #fcfcfc;
            padding: 24px;
            overflow: auto;
            border-radius: 8px;
            @media only screen and (max-width: 600px) {
              height: 60vh;
            }
          `}
        >
          <Box
            onClick={() => setOpenAddAnimeModal(false)}
            className={css`
              text-align: right;
              margin-bottom: 10px;
              cursor: pointer;
            `}
          >
            X
          </Box>
          <Select
            options={collections}
            value={collectionID}
            onChange={(e) => setCollectionID(e.target.value)}
          />
          <Box
            className={css`
              margin-top: 20px;
            `}
          >
            <Box>
              {addedAnime?.length > 0 ? (
                <>
                  {addedAnime?.map((anime: Anime, index: number) => (
                    <Box
                      key={index}
                      className={css`
                        margin-bottom: 20px;
                      `}
                    >
                      <Card data={anime} redirect={false} />
                    </Box>
                  ))}
                </>
              ) : (
                <Box
                  className={cx(css`
                    grid-column: span 12 / span 12;
                    background: #161716;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 12px;
                    height: 100px;
                    padding: 12px;
                  `)}
                >
                  No selected anime or selected anime has been added in this
                  collection
                </Box>
              )}
            </Box>
            {addedAnime?.length > 0 && (
              <Button
                className={css`
                  margin-top: 20px;
                `}
                onClick={() => onAddManyAnime()}
                fullWidth
              >
                Add To Collection
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
      <Head
        title="Anime List"
        description="list of anime"
        image={defaultImage?.card}
      />
    </Container>
  );
};

export default Page;

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
