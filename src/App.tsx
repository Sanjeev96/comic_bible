import { Box, Grid, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/header";
import { ListView } from "./components/listView";
import { LoadingSpinner } from "./components/loadingSpinnner";
import { RecentComicsApi, SearchSeriesApi } from "./services/marvelData";
import { useAppSelector } from "./services/state/hooks/store";

const useStyles = makeStyles(() => ({
  navbarContainer: {
    padding: "0px 0px 15px 5px",
    backgroundColor: "#2E2E2E",
    color: "#FFF",
    background: "linear-gradient(to left, #5C5C5C, #171717) right",
  },
  comicContainer: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: "70px",
  },
}));

export const App: React.FC = observer(() => {
  const classes = useStyles();

  const getSearch = useAppSelector((state) => state.Ui.search);

  const [recentComics, setRecentComics] = useState<any>([]);
  const [searchedComics, setSearchedComics] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecentComics = async () => {
    setLoading(true);
    setRecentComics(await RecentComicsApi());
    setLoading(false);
  };

  const fetchSearchedComics = useCallback(async () => {
    if (getSearch !== "" || getSearch === null) {
      setLoading(true);
      setSearchedComics(
        await SearchSeriesApi(getSearch).finally(() => {
          setLoading(false);
        })
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
      <Grid container xs={12}>
        <Grid xs={12} className={classes.navbarContainer} item>
          <Header />
        </Grid>
      </Grid>
      <Grid className={classes.comicContainer} item xs={12}>
        {loading && <LoadingSpinner />}
        {!getSearch ? (
          <ListView comics={recentComics} />
        ) : (
          <ListView comics={searchedComics} />
        )}
        <ListView comics={recentComics} />
      </Grid>
    </>
  );
});

export default App;
