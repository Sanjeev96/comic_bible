import {
  Grid,
  IconButton,
  makeStyles,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import { useStore } from "../services/state/hooks/useStore";

const useStyles = makeStyles(() => ({
  navbarContainer: {
    marginTop: "12px",

    padding: "15px 5px 15px 5px",
    color: "#FFF",
    backgroundColor: "linear-gradient(black,grey)",
    width: "95%",
    marginLeft: "2%",
    borderRadius: "10px",
    boxShadow:
      "0px 20px 40px -5px rgba(0,0,0,0.2), inset 0px 0px 8px rgba(0,0,0,1);",
    transform: "rotateY(0deg) rotateX(20deg) rotateZ(0deg)",
  },

  navbarTitle: {
    padding: "30px",
  },

  navbarCanvas: {
    backgroundColor: "#b08307",
  },

  navbarSearch: {
    color: "#FFF",
    borderRadius: "10px",
    marginRight: "20px",
  },
}));

export const Header: React.FC = () => {
  const classes = useStyles();

  const {
    dataStore: { setSearch },
  } = useStore();

  const formikSubmit = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      return setSearch(values.search);
    },
  });

  return (
    <form id="searchForm" onSubmit={formikSubmit.handleSubmit}>
      <Grid container className={classes.navbarContainer} alignItems="center">
        <Grid style={{ textAlign: "center" }} xs={4} md={3}>
          <Typography>Comic Bible</Typography>
        </Grid>
        <Grid style={{ textAlign: "center" }} item xs={4} md={3}>
          <Typography>My comic list</Typography>
        </Grid>
        <Grid style={{ textAlign: "center" }} item xs={4} md={3}>
          <Typography>About us</Typography>
        </Grid>
        <Grid item xs={12} md={3} spacing={2}>
          <OutlinedInput
            onChange={formikSubmit.handleChange}
            id="search"
            name="search"
            className={classes.navbarSearch}
            fullWidth
            placeholder="Search"
            endAdornment={
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            }
          ></OutlinedInput>
        </Grid>
      </Grid>
    </form>
  );
};
