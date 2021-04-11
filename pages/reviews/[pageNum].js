import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

export default function Home({ reviews }) {
  const router = useRouter();
  const { pageNum } = router.query;

  return (
    <Layout>
      <Grid container spacing={3}>
        {reviews?.map((review) => (
          <Grid item xs={4}>
            <Card key={review._id}>
              <CardContent>
                <Typography variant="h6">{review.name} &rarr;</Typography>
                <Typography
                  variant="p"
                  style={{
                    maxHeight: 300,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {review.body}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Link
          href={`/reviews/${parseInt(pageNum) - 1}`}
          disabled={pageNum === 0}
        >
          <Button variant="contained" color="primary">
            Previous Page
          </Button>
        </Link>

        <Link href={`/reviews/${parseInt(pageNum) + 1}`}>
          <Button variant="contained" color="primary">
            Next Page
          </Button>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { pageNum } = context.query;
  const res = await fetch(`http://localhost:3000/api/reviews/page/${pageNum}`);
  const data = await res.json();
  return {
    props: { reviews: JSON.parse(JSON.stringify(data)) },
  };
}
