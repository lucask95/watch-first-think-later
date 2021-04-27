import {
  Button,
  Divider,
  FormControl,
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
import server from "../../config";
import { Box, Center, Flex, Grid, GridItem } from "@chakra-ui/layout";

const useStyles = makeStyles({
  searchButton: {
    color: "white",
    "&:hover": {
      color: appConstants.accentColor,
    },
  },
});

function OrderSelect({ sortValue, setSortValue, sortOrder, toggleSortOrder }) {
  return (
    <Flex direction='row' alignItems='center' w='min-content'>
      <Typography
        style={{ marginRight: 7, color: "white", whiteSpace: "nowrap" }}
      >
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
      <IconButton onClick={toggleSortOrder}>
        {sortOrder === appConstants.ASC ? (
          <ArrowUpward style={{ color: "white" }} />
        ) : (
          <ArrowDownward style={{ color: "white" }} />
        )}
      </IconButton>
    </Flex>
  );
}

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
      <Flex justify='flex-end' maxW='1200px' mx='auto' mb='20px'>
        <OrderSelect
          sortValue={sortValue}
          setSortValue={setSortValue}
          sortOrder={sortOrder}
          toggleSortOrder={toggleSortOrder}
        />
      </Flex>

      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={{ base: "20px", lg: "30px" }}
        maxW='1200px'
        m='auto'
      >
        {reviews?.map((review) => (
          <ReviewCard review={review} />
        ))}{" "}
      </Grid>

      <Flex justify='space-between' maxW='1200px' mx='auto' mt='20px'>
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
      </Flex>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { pageNum, sort, order } = context.query;
  const res = await fetch(
    `${server}/api/reviews/page/${pageNum}?sort=${
      sort ?? appConstants.DATE
    }&order=${order ?? appConstants.DESC}`
  );
  const data = await res.json();
  return {
    props: { reviews: JSON.parse(JSON.stringify(data)) },
  };
}
