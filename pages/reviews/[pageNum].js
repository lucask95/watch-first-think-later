import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import ReviewCard from "../../components/ReviewCard";
import appConstants from "../../util/constants";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  searchButton: {
    color: "white",
    "&:hover": {
      color: appConstants.accentColor,
    },
  },
});

const ASC = 0;
const DESC = 1;
const sortArray = [-1, 1];

export default function Home({ reviews }) {
  const router = useRouter();
  const { pageNum } = router.query;
  const prevDisabled = parseInt(pageNum) === 0;
  const [sortValue, setSortValue] = useState(appConstants.DATE);
  const [sortOrder, setSortOrder] = useState(ASC);
  const [sortedReviews, setSortedReviews] = useState(reviews);

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    let sorted = reviews.sort((el1, el2) => {
      switch (sortValue) {
        case appConstants.DATE:
          const d1 = Date.parse(el1.date);
          const d2 = Date.parse(el2.date);
          if (d1 > d2) return 1;
          if (d1 < d2) return -1;
          break;

        default:
          return 0;
          break;
      }
      return 0;
    });
    if (sortOrder === DESC) sorted = sorted.reverse();
    setSortedReviews(sorted);
  }, [sortValue, sortOrder]);

  return (
    <Layout>
      <Grid container spacing={4} style={{ padding: "20px 100px" }}>
        <Grid
          container
          item
          spacing={2}
          xs={12}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {/* Sort by */}
          <Typography style={{ marginRight: 7, color: "white" }}>
            Sort by
          </Typography>
          <FormControl
            variant='outlined'
            margin='dense'
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              width: 200,
            }}
          >
            <Select
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
            >
              <MenuItem value={appConstants.DATE}>Date Reviewed</MenuItem>
              <MenuItem value={appConstants.RATING}>Rating</MenuItem>
              <MenuItem value={appConstants.TITLE}>Title</MenuItem>
              <MenuItem value={appConstants.YEAR}>Film Year</MenuItem>
            </Select>
          </FormControl>

          <Divider
            orientation='vertical'
            flexItem
            style={{ margin: "0 10px 0 20px" }}
          />

          {/* Search */}
          <Grid item>
            <TextField
              variant='outlined'
              margin='dense'
              placeholder='Search for a film'
              style={{ backgroundColor: "white", borderRadius: 5 }}
            />
          </Grid>
          <Grid item>
            <IconButton>
              <SearchIcon style={{ color: "white" }} />
            </IconButton>
          </Grid>
        </Grid>

        {/* Reviews */}
        {reviews?.map((review) => (
          <Grid item xs={6} key={review._id}>
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
