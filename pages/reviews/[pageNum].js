import { Button, Grid } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import ReviewCard from "../../components/ReviewCard";
import appConstants from "../../util/constants";

export default function Home({ reviews }) {
  const router = useRouter();
  const { pageNum } = router.query;
  const prevDisabled = parseInt(pageNum) === 0;

  return (
    <Layout>
      <Grid container spacing={3}>
        {reviews?.map((review) => (
          <Grid item xs={4} key={review._id}>
            <ReviewCard review={review} />
          </Grid>
        ))}
      </Grid>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          padding: "16px 0 0",
        }}
      >
        <Link href={`/reviews/${parseInt(pageNum) - 1}`}>
          <Button
            variant='contained'
            style={{
              backgroundColor: prevDisabled ? "gray" : appConstants.accentColor,
              color: "white",
            }}
            disabled={prevDisabled}
          >
            Previous Page
          </Button>
        </Link>

        <Link href={`/reviews/${parseInt(pageNum) + 1}`}>
          <Button
            variant='contained'
            style={{
              backgroundColor: appConstants.accentColor,
              color: "white",
            }}
          >
            Next Page
          </Button>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { pageNum } = context.query;
  const res = await fetch(`https://localhost:3000/api/reviews/page/${pageNum}`);
  const data = await res.json();
  return {
    props: { reviews: JSON.parse(JSON.stringify(data)) },
  };
}
