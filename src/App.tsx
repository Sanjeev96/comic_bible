import { Box, Grid, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/header";
import { ListView } from "./components/listView";
import { LoadingSpinner } from "./components/loadingSpinnner";
import { RecentComicsApi, SearchSeriesApi } from "./services/marvelData";
import { useStore } from "./services/state/hooks/useStore";

const useStyles = makeStyles(() => ({
  appCanvas: {
    overflowX: "hidden",
  },
}));

export const App: React.FC = observer(() => {
  const classes = useStyles();
  const {
    dataStore: { search, getSearch },
  } = useStore();

  const [recentComics, setRecentComics] = useState<any>([]);
  const [searchedComics, setSearchedComics] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecentComics = async () => {
    setLoading(true);
    const dataRecent = await RecentComicsApi();
    setRecentComics(dataRecent);
    setLoading(false);
  };

  const fetchSearchedComics = useCallback(async () => {
    if (search !== "" || search === null) {
      setLoading(true);
      const dataSearched = await SearchSeriesApi(getSearch);
      setSearchedComics(dataSearched);
      setLoading(false);
    }
  }, [getSearch, search]);

  useEffect(() => {
    fetchRecentComics();
    fetchSearchedComics();
  }, [fetchSearchedComics]);

  return (
    <Box className={classes.appCanvas}>
      <Grid container xs={12}>
        <Grid xs={12} item>
          <Header />
        </Grid>
      </Grid>
      <Grid xs={12}>
        {loading && <LoadingSpinner />}
        {!search ? (
          <ListView comics={recentComics} />
        ) : (
          <ListView comics={searchedComics} />
        )}
      </Grid>
      {/* <ListView /> */}
    </Box>
  );
});

export default App;
