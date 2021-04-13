import { Card, Typography } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";

export default function Home({ reviews }) {
  return (
    <div className="container">
      <Head>
        <title>Lucas' Film Reviews</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography variant="h2">Lucas' Film Reviews</Typography>

        <div>
          {reviews?.map((review) => (
            <Card key={review._id}>
              <Typography variant="h3">{review.name} &rarr;</Typography>
              <p
                style={{
                  maxHeight: 300,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {review.body}
              </p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/reviews/page/0");
  const data = await res.json();
  return {
    props: { reviews: JSON.parse(JSON.stringify(data)) },
  };
}
