import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { ComicDataSetModal } from "../models/marvelApi.model";

const useStyles = makeStyles(() => ({
  comicContainer: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: "70px",
  },

  comicImage: {
    borderRadius: "8px",
    boxShadow:
      "-30px 30px 30px -5px rgba(255,255,0,0.3), inset 0px 0px 15px rgba(0,0,0,1);",
    transform: "rotateY(10deg) rotateX(15deg) rotateZ(0deg)",
    "&:hover": {
      transform: "rotateY(0deg) rotateX(0deg) rotateZ(0deg)",
    },
  },

  comicInfo: {
    textAlign: "center",
    marginLeft: "42px",
  },
}));

export const ListView: React.FC<any> = (props: {
  comics: ComicDataSetModal[];
}) => {
  const comics = props.comics;
  const classes = useStyles();

  // console.log(comics);

  return (
    <>
      <Grid spacing={10} container className={classes.comicContainer}>
        {comics.map((comic: ComicDataSetModal) => (
          <Grid
            key={comic.id}
            item
            style={{ padding: "0px" }}
            xs={10}
            sm={6}
            md={4}
          >
            <img
              className={classes.comicImage}
              width="250px"
              src={comic.thumbnail.path + "/portrait_xlarge.jpg"}
              alt="No Cover yet"
            />
            <Typography>{comic.title}</Typography>
            <Typography color="inherit">
              {comic.dates[0].type === "onsaleDate"
                ? (comic.dates[0].date = new Date().toLocaleDateString("en-GB"))
                : "SALE DATE TBD"}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
