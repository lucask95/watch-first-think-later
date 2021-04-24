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
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

const useStyles = makeStyles({
  searchButton: {
    color: "white",
    "&:hover": {
      color: appConstants.accentColor,
    },
  },
});

export default function Home({ reviews }) {
  const router = useRouter();
  const { pageNum } = router.query;
  const prevDisabled = parseInt(pageNum) === 1;
  const [sortValue, setSortValue] = useState(appConstants.DATE);
  const [sortOrder, setSortOrder] = useState(appConstants.DESC);

  const toggleSortOrder = () => {
    setSortOrder(
      sortOrder === appConstants.ASC ? appConstants.DESC : appConstants.ASC
    );
  };

  useEffect(() => {
    router.push(`/reviews/${pageNum}?sort=${sortValue}&order=${sortOrder}`);
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
          <IconButton style={{ marginLeft: 15 }} onClick={toggleSortOrder}>
            {sortOrder === appConstants.ASC ? (
              <ArrowUpward style={{ color: "white" }} />
            ) : (
              <ArrowDownward style={{ color: "white" }} />
            )}
          </IconButton>

          {/* <Divider
            orientation='vertical'
            flexItem
            style={{ margin: "0 10px" }}
          /> */}

          {/* Search */}
          {/* <Grid item>
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
          </Grid> */}
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
        <Link
          href={`/reviews/${
            parseInt(pageNum) - 1
          }?sort=${sortValue}&order=${sortOrder}`}
        >
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

        <Link
          href={`/reviews/${
            parseInt(pageNum) + 1
          }?sort=${sortValue}&order=${sortOrder}`}
        >
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
  const { pageNum, sort, order } = context.query;
  const res = await fetch(
    `https://localhost:3000/api/reviews/page/${pageNum}?sort=${
      sort ?? appConstants.DATE
    }&order=${order ?? appConstants.DESC}`
  );
  const data = await res.json();
  return {
    props: { reviews: JSON.parse(JSON.stringify(data)) },
  };
}
