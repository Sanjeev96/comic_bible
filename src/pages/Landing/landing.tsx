import { Box, Grid, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Header } from "../../components/header";
import { ListView } from "../../components/listView";
import { LoadingSpinner } from "../../components/loadingSpinnner";
import { RecentComicsApi, SearchSeriesApi } from "../../services/marvelData";
import { useAppSelector } from "../../services/state/hooks/store";
import { setLoad } from "../../services/state/uiSlice";

const useStyles = makeStyles(() => ({
  comicContainer: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: "70px",
  },
}));

export const Landing: React.FC = observer(() => {
  const classes = useStyles();

  const getSearch = useAppSelector((state) => state.Ui.search);
  const getLoad = useAppSelector((state) => state.Ui.loading);

  const dispatchLoad = useDispatch();

  const [recentComics, setRecentComics] = useState<any>([]);
  const [searchedComics, setSearchedComics] = useState<any>([]);

  const fetchRecentComics = async () => {
    dispatchLoad(setLoad(true));
    setRecentComics(
      await RecentComicsApi().finally(() => dispatchLoad(setLoad(false)))
    );
  };

  const fetchSearchedComics = useCallback(async () => {
    dispatchLoad(setLoad(true));

    if (getSearch !== "" || getSearch === null) {
      setSearchedComics(
        await SearchSeriesApi(getSearch).finally(() =>
          dispatchLoad(setLoad(false))
        )
      );
    }
  }, [getSearch]);

  useEffect(() => {
    fetchRecentComics();
  }, []);

  useEffect(() => {
    fetchSearchedComics();
  }, [getSearch]);

  return (
    <>
      <Grid container xs={12}></Grid>
      <Grid className={classes.comicContainer} item xs={12}>
        {!getSearch ? (
          <ListView comics={recentComics} loader={getLoad} />
        ) : (
          <ListView comics={searchedComics} loader={getLoad} />
        )}
      </Grid>
    </>
  );
});
