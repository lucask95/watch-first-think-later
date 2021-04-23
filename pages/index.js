import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import Layout from "../components/Layout";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import ContentArea from "../components/ContentArea";
import ReviewInfo from "../components/review/ReviewInfo";

const useStyles = makeStyles({
  scoreCircle: {
    width: 150,
    height: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    backgroundColor: "green",
    margin: "15px 30px 15px 0",
  },
  scoreText: {
    fontWeight: "bolder",
    fontStyle: "italic",
    marginLeft: -1,
    color: "white",
  },
  reviewText: {
    marginTop: 15,
  },
});

export default function Home({ reviews }) {
  // const [session, loading] = useSession();

  const classes = useStyles();
  const latestReview = reviews?.[0];

  const getBackgroundColor = (score) => {
    if (score === 0) return "#828282";
    if (score <= 1.5) return "#bf3a37";
    if (score <= 2.5) return "#d9ad3d";
    if (score <= 3.5) return "#3c9e65";
    if (score <= 5) return "#3c9e65";
  };

  return (
    <Layout titleAddition='Bite-sized film reviews'>
      <Typography variant='h4' style={{ color: "white" }} gutterBottom>
        See What's New
      </Typography>

      {/* Latest Review */}
      <ContentArea>
        <Typography variant='h5'>
          Latest Review — {latestReview.name}
        </Typography>
        <ReviewInfo date={latestReview.date} user={latestReview.user} />
        <div
          style={{ display: "grid", gridTemplateColumns: "min-content 1fr" }}
        >
          <Grid
            item
            className={classes.scoreCircle}
            style={{ backgroundColor: getBackgroundColor(latestReview.rating) }}
          >
            <Typography variant='h2' className={classes.scoreText}>
              {latestReview.rating === 0 ? "?" : latestReview.rating}
            </Typography>
            <Typography
              style={{
                marginTop: 30,
                marginLeft: 10,
                color: "white",
                fontStyle: "italic",
              }}
            >
              / 5
            </Typography>
          </Grid>
          <Grid item className={classes.reviewText}>
            {latestReview.body.split("\n").map((paragraph) => (
              <Typography variant='body1' gutterBottom>
                {paragraph}
              </Typography>
            ))}
          </Grid>
        </div>
      </ContentArea>

      {/* Latest Video */}
      {/* The next 3 reviews */}
      {/* <Typography variant='h5' gutterBottom>
          Hi, I'm Lucas.
        </Typography>
        <Typography variant='body1'>
          I'm a film enthusiast who writes quick reviews for the modern
          media-consuming millenial with a short attention span. Watch First,
          Think Later is a personal project of mine aiming to catalog my reviews
          as well as some short-form video content that I hope to create in the
          near future.
        </Typography>
        <Typography>
          Take a look at the <Link href="/reviews/page/0">Reviews page</Link> to see a list of films I've watched and reviewed recently
        </Typography> */}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://localhost:3000/api/reviews/page/0`);
  const data = await res.json();
  return {
    props: { reviews: JSON.parse(JSON.stringify(data)) },
  };
}
