import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import ContentArea from "../components/ContentArea";
import Layout from "../components/Layout";
import appConstants from "../util/constants";

const favoriteFilms = [
  {
    name: "Spirited Away",
    imageUrl: "/img/spiritedaway.jpg",
    description: `
      Spirited Away is the story of a young girl, Chihiro, who is separated from her parents in a land of spirits,
      and to find them again she must grow stronger and come to have faith in herself. It's a classic coming-of-age
      setup but packaged in a way that you'll rarely find in any other film.
      *newparagraph*
      I've been watching Spirited Away since I was a kid, and I don't know if I'll ever get tired of it. The world
      is so vivid and mysterious, and I love that the film provides very few answers as to how it works.
      Many of the characters occupy a moral gray-area, and the viewer (and Chihiro) is never sure exactly what to
      make of them. Even characters like Yubaba come to be rather likeable as the plot progresses.
      *newparagraph*
      Spirited Away has, to me, an unparalleled sense of wonder and discovery compared to any other film I've seen.
      I think this one will be a favorite of mine until I die.
    `,
  },
  {
    name: "La Jetée",
    imageUrl: "/img/lajetee.jpg",
    description: `
      La Jetée depicts a man living in hiding in post-World-War-III France who becomes subject to
      time-travel experiments by the people in charge of his settlement.
      *newparagraph*
      Chris Marker's La Jetée manages to be more moving and creative than 99% of science-fiction films
      with just a quarter of the run time and a tiny fraction of the budget. The gritty black-and-white
      still shots present the film almost as a slideshow rather than a traditional film. It's rather
      appropriate, as La Jetée's story is a sort of recollection of memories instead of an active plot.
      This meditation on memory and reality proves to be recurring theme in Marker's other works that I've seen.
      *newparagraph*
      If you're looking for a short and sweet sci-fi that could very possibly alter your entire perspective on
      films, then give this one a watch.
    `,
  },
  {
    name: "Lady Bird",
    imageUrl: "/img/ladybird.jpg",
    description: `
      Lady Bird is another coming-of-age film in which the titular Lady Bird, who has a love-hate relationship with
      her mother and her hometown, is coming up on graduating from high school and must decide what to do with her future.
      *newparagraph*
      Lady Bird might not be for everyone, but I personally find it to be so lovely. The characters are written
      so well that they feel almost as if they've been plucked right off of the street and put into the film.
      *newparagraph*
      The character dynamic between Lady Bird and her mother is not a unique situation in reality but seems to
      be a bit uncommon in the world of film. To see such an authentic relationship depicted on screen is a
      treat, and it hits close to home not only for me but for many others as well.
    `,
  },
  {
    name: "Waves",
    imageUrl: "/img/waves.jpg",
    description: `
      Waves tells the story of a family that goes through growing pains and trauma and how it eventually
      begins the process of healing.
      *newparagraph*
      Again, a film that might not be for everyone. Waves is a bit caught up in its style, but it is a real
      tour de force of incredible performances. Every single person in this film plays their part perfectly,
      and I'm especially impressed by Kelvin Harrison for how well he can emote and express feelings without
      saying a single word.
      *newparagraph*
      Waves is equal parts harrowing and cathartic, and while it piles on the pressure, it also proves such
      a release. Give this one a chance, and you just might come away from it with a new favorite.
    `,
  },
  {
    name: "Perfect Blue",
    imageUrl: "/img/perfectblue.jpg",
    description: `
      Perfect Blue is a paranoiac film about a pop star, Mima, who gives up her pop career to pursue
      her dream of being an actress. As she does, she deals with an obsessed stalker and begins to question
      her own reality.
      *newparagraph*
      Perfect Blue is not for the faint of heart. There are some gruesome and shocking scenes, but if you
      have the stomach for it, then I highly recommend giving it a watch. No other film I've seen has come
      anywhere close to Perfect Blue in making me question the reality of the film and the characters. The film
      makes full use of the animation medium to create scenes that could not exist in live-action.
      *newparagraph*
      Perfect Blue is incredibly thrilling while also getting the viewer to question the morality of stardom.
      Stars and celebrities are images that have been built up by the media and created in our own brains,
      but this amalgamation of stories does not reflect the true reality of the individual.
    `,
  },
];

const useStyles = makeStyles({
  textLink: {
    color: "black",
    textDecoration: "none",
    transition: "color .10s",
    "&:hover": {
      textDecoration: "underline",
      color: appConstants.accentColor,
    },
  },
});

export default function about() {
  const classes = useStyles();

  return (
    <Layout titleAddition='About'>
      <ContentArea header='About Watch First Think Later'>
        <Typography style={{ padding: 10 }} gutterBottom>
          Hi, I'm Lucas. I'm a film enthusiast who loves to catalog the various
          media I consume and write quick reviews for the modern media-consuming
          millenial with a short attention span. Watch First, Think Later is a
          personal project of mine aiming to catalog my reviews as well as some
          short-form video content that I hope to create in the near future. I
          plan on posting more detailed reviews as well as short video essays
          soon. Stay tuned for more, and thanks for reading.
        </Typography>

        <Typography variant='h5' gutterBottom>
          Some of My Favorite Films
        </Typography>

        <Grid container spacing={4} style={{ padding: 10 }}>
          {favoriteFilms.map((film) => (
            <Grid item xs={4} key={film.name}>
              <Card>
                <CardMedia style={{ height: 200 }} image={film.imageUrl} />
                <CardContent>
                  <Typography variant='h6' gutterBottom>
                    {film.name}
                  </Typography>
                  {film.description.split("*newparagraph*").map((paragraph) => (
                    <Typography variant='body2' gutterBottom>
                      {paragraph}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}
        >
          <Link href='/reviews/1'>
            <a className={classes.textLink}>
              <Typography>Read more reviews &rarr;</Typography>
            </a>
          </Link>
        </div>
      </ContentArea>
    </Layout>
  );
}
