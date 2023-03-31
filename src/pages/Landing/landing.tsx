import { Box, Grid, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { ListView } from "../../components/listView";
import { RecentComicsApi, SearchSeriesApi } from "../../services/marvelData";
import { AppDispatch, RootState, useAppSelector } from "../../services/state/hooks/store";
import { setLoad } from "../../services/state/uiSlice";
import { recentComicsApi } from "../../services/state/dataSlice";
import { useDispatch, useSelector } from "react-redux";


const useStyles = makeStyles(() => ({
  comicContainer: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: "70px",
  },
}));

export const Landing: React.FC = observer(() => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const apiData = useSelector((state: RootState) => state.Data.recentComics);
  const isLoading = useSelector((state: RootState) => state.Data.isLoading);
  const error = useSelector((state: RootState) => state.Data.error);


  const getSearch = useAppSelector((state) => state.Ui.search);
  const getLoad = useAppSelector((state) => state.Ui.loading);


  const [recentComics, setRecentComics] = useState<any>([]);
  const [searchedComics, setSearchedComics] = useState<any>([]);

  // const fetchRecentComics = async() => {
  //   // dispatch(setLoad(true));
  //   // setRecentComics(
  //   //   await RecentComicsApi().finally(() => dispatch(setLoad(false)))
  //   // );
  // };

  const fetchSearchedComics = useCallback(async () => {
    dispatch(setLoad(true));

    if (getSearch !== "" || getSearch === null) {
      setSearchedComics(
        await SearchSeriesApi(getSearch).finally(() =>
        dispatch(setLoad(false))
        )
      );
    }
  }, [getSearch]);

  useEffect(() => {
    dispatch(recentComicsApi());
  }, [dispatch]);

  useEffect(() => {
    console.log({apiData});
  }, [apiData]);

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
