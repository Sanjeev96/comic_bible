import { Landing } from "./pages/Landing/landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Notes } from "./pages/Notes";
import { Grid, makeStyles } from "@material-ui/core";
import { Header } from "./components/header";

const useStyles = makeStyles(() => ({
  navbarContainer: {
    padding: "0px 0px 15px 5px",
    backgroundColor: "#2E2E2E",
    color: "#FFF",
    background: "linear-gradient(to left, #5C5C5C, #171717) right",
  },
}));

export const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Router>
      <Grid xs={12} className={classes.navbarContainer} item>
        <Header />
      </Grid>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/notes" element={<Notes />} />

        <Route path="*" element={"NOT FOUND"} />
      </Routes>
    </Router>
  );
};

export default App;
