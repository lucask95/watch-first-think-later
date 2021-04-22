import { Grid, Typography } from "@material-ui/core";
import React from "react";
import ContentArea from "../components/ContentArea";
import Layout from "../components/Layout";
import appConstants from "../util/constants";

export default function about() {
  const favoriteFilms = [
    {
      imageUrl: "",
      name: "Spirited Away",
      description: `
        I've been watching Spirited Away since I was a kid, and I don't know if
        I'll ever get tired of it. The world is so vivid and mysterious, and I
        love that the film provides very few answers as to how it works.
        Many of the characters occupy a moral gray-area, and the viewer (and Chihiro)
        is never sure exactly what to make of them. Even characters like Yubaba come
        to be rather likeable as the plot progresses.
      `,
    },
  ];

  return (
    <Layout titleAddition="About">
      <ContentArea header="About Watch First Think Later">
        <Typography variant="body2" gutterBottom>
          Hi, I'm Lucas. I'm a film enthusiast who loves to catalog the various
          media I consume. I made Watch First Think Later to practice my web
          development, writing, and video editing skills. I plan on posting more
          detailed reviews as well as short video essays in the future. Stay
          tuned for more, and thanks for reading.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Favorite Films
        </Typography>
        <Grid container spacing={3}>
          {favoriteFilms.map((film) => (
            <Grid item xs={3} key={film.name}>
              <Typography variant="subtitle1" gutterBottom>
                {film.name}
              </Typography>
              <Typography variant="body2">{film.description}</Typography>
            </Grid>
          ))}
        </Grid>
      </ContentArea>
    </Layout>
  );
}
