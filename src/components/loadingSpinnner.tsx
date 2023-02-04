import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  overlayContainer: {
    position: "fixed",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    zIndex: 999999,
    backgroundColor: "#404040",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "none",
    color: "blue",
  },
  loadTxt: {
    color: "rgba(255, 255, 0, 0.7)",
  },
}));

export const LoadingSpinner: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.overlayContainer}>
        <Typography className={classes.loadTxt}>
          <h2>Loading...</h2>
        </Typography>
        <CircularProgress
          style={{ color: "rgba(255, 255, 0, 0.7)" }}
          size={150}
        />
      </Box>
    </>
  );
};
