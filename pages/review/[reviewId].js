import { Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import Layout from "../../components/Layout";
import ReviewInfo from "../../components/review/ReviewInfo";
import ReviewRating from "../../components/review/ReviewRating";
import appConstants from "../../util/constants";

export default function Home({ review }) {
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
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { reviewId } = context.query;
  const res = await fetch(`https://localhost:3000/api/reviews/${reviewId}`);
  const data = await res.json();
  return {
    props: { review: JSON.parse(JSON.stringify(data)) },
  };
}
