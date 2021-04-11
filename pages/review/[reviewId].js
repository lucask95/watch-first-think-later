import { Typography } from "@material-ui/core";
import React from "react";
import Layout from "../../components/Layout";

export default function Home({ review }) {
  return (
    <Layout titleAddition={`${review.name} - Film Review`}>
      <Typography variant="h5">{`${review.name} Review`}</Typography>
      <Typography variant="body2">{review.body}</Typography>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { reviewId } = context.query;
  const res = await fetch(`http://localhost:3000/api/reviews/${reviewId}`);
  const data = await res.json();
  return {
    props: { review: JSON.parse(JSON.stringify(data)) },
  };
}
