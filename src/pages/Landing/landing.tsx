import { Box, Grid, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { ListView } from "../../components/listView";
import {
  AppDispatch,
  RootState,
  useAppSelector,
} from "../../services/state/hooks/store";
import { setLoad } from "../../services/state/uiSlice";
import {
  recentComicsApi,
  searchedComicsApi,
} from "../../services/state/dataSlice";
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
  const { recentComics, searchedComics, isLoading } = useSelector(
    (state: RootState) => state.Data
  );

  const getSearch = useAppSelector((state) => state.Ui.search);
  const getLoad = useAppSelector((state) => state.Ui.loading);

  const fetchSearchedComics = useCallback(async () => {
    dispatch(setLoad(true));

    if (getSearch !== "" || getSearch === null) {
      await dispatch(searchedComicsApi(getSearch));
    }
  }, [getSearch]);

  useEffect(() => {
    dispatch(recentComicsApi());
  }, [dispatch]);

  useEffect(() => {
    fetchSearchedComics();
  }, [getSearch]);

  return (
    <>
      <Grid container xs={12}></Grid>
      <Grid className={classes.comicContainer} item xs={12}>
        {!getSearch ? (
          <ListView comics={recentComics} loader={isLoading} />
        ) : (
          <ListView comics={searchedComics} loader={isLoading} />
        )}
      </Grid>
    </>
  );
});
