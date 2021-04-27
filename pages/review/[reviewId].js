import { Flex } from "@chakra-ui/layout";
import { Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../../components/Layout";
import ReviewInfo from "../../components/review/ReviewInfo";
import ReviewRating from "../../components/review/ReviewRating";
import server from "../../config";
import appConstants from "../../util/constants";

const useStyles = makeStyles({
  textLink: {
    color: "white",
    textDecoration: "none",
    transition: "color .10s",
    "&:hover": {
      textDecoration: "underline",
      color: appConstants.accentColor,
    },
  },
});

export default function Home({ review }) {
  const classes = useStyles();

  return (
    <Layout titleAddition={`${review.name} - Film Review`}>
      <div style={appConstants.contentArea}>
        <Typography
          variant='h5'
          gutterBottom
        >{`${review.name} — Film Review`}</Typography>
        <ReviewInfo user={review.user} date={review.date} />
        <ReviewRating rating={review.rating} />
        {review.body.split("\n").map((part, index) => (
          <Typography key={index} variant='body2' gutterBottom>
            {part}
          </Typography>
        ))}
      </div>

      <Flex justify='flex-end' mt='15px'>
        <Link href='/reviews/1' className={classes.textLink}>
          <Typography>Read more reviews &rarr;</Typography>
        </Link>
      </Flex>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { reviewId } = context.query;
  const res = await fetch(`${server}/api/reviews/${reviewId}`);
  const data = await res.json();
  return {
    props: { review: JSON.parse(JSON.stringify(data)) },
  };
}
