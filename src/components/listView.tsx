import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { ComicDataSetModal } from "../models/marvelApi.model";
import { LoadingSpinner } from "./loadingSpinnner";
import { ToggleIssue } from "./toggleIssue";

const useStyles = makeStyles(() => ({
  comicImage: {
    display: "block",
    margin: "0 auto",

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

export const ListView: React.FC<{
  comics: ComicDataSetModal[];
  loader: boolean;
}> = (props) => {
  const comics = props.comics;
  const classes = useStyles();

  return (
    <>
      {props.loader && <LoadingSpinner />}
      <Grid container>
        {comics.map((comic: ComicDataSetModal) => (
          <Grid key={comic.id} item xs={12} sm={6} md={4}>
            <img
              className={classes.comicImage}
              width="250px"
              src={comic.thumbnail.path + "/portrait_xlarge.jpg"}
              alt="No Cover yet"
            />

            <Typography className={"text-white"}>{comic.title}</Typography>
            <Typography className={"text-white"}>
              {comic.dates[0].type === "onsaleDate"
                ? (comic.dates[0].date = new Date().toLocaleDateString("en-GB"))
                : "SALE DATE TBD"}
            </Typography>
            <ToggleIssue {...comic} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
