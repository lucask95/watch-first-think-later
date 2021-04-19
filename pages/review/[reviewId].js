import { Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import Layout from "../../components/Layout";
import appConstants from "../../util/constants";

export default function Home({ review }) {
  return (
    <Layout titleAddition={`${review.name} - Film Review`}>
      <div style={appConstants.contentArea}>
        <Typography
          variant='h5'
          gutterBottom
        >{`${review.name} — Film Review`}</Typography>
        <div style={{ marginBottom: 10 }}>
          <Typography variant='caption' gutterBottom>
            {review.date}
          </Typography>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Rating value={review.rating} precision={0.5} readOnly />
        </div>
        <Typography variant='body2'>{review.body}</Typography>
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
