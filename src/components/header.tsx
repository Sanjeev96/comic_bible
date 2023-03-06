import {
  Grid,
  IconButton,
  makeStyles,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setSearch } from "../services/state/uiSlice";

const useStyles = makeStyles(() => ({
  navbarTitle: {
    padding: "30px",
  },

  navbarCanvas: {
    padding: "20px 40px 0px",
  },

  navbarSearch: {
    color: "#FFF",
    borderRadius: "10px",
    marginRight: "20px",
  },
}));

export const Header: React.FC = () => {
  const classes = useStyles();

  const dispatchSearch = useDispatch();

  const formikSubmit = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      dispatchSearch(setSearch(values.search));
    },
  });

  return (
    <form id="searchForm" onSubmit={formikSubmit.handleSubmit}>
      <Grid className={classes.navbarCanvas} container alignItems="center">
        <Grid style={{ textAlign: "center" }} item xs={4} md={3}>
          <Typography>Comic Bible</Typography>
        </Grid>
        <Grid style={{ textAlign: "center" }} item xs={4} md={3}>
          <Typography>My comic list</Typography>
        </Grid>
        <Grid style={{ textAlign: "center" }} item xs={4} md={3}>
          <Typography>About us</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
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
