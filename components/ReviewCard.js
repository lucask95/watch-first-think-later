import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import React from "react";
import appConstants from "../util/constants";
import ReviewInfo from "./review/ReviewInfo";
import ReviewRating from "./review/ReviewRating";

const useStyles = makeStyles({
  card: {
    boxSizing: "border-box",
    border: "1px solid white",
    transition: "border .1s, color .1s",
    "&:hover": {
      border: `1px solid ${appConstants.accentColor}`,
      color: appConstants.accentColor,
    },
  },
});

export default function ReviewCard({ review }) {
  const classes = useStyles();

  return (
    <Link href={`/review/${review._id}`}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent style={{ paddingBottom: 16 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr min-content",
              }}
            >
              <Typography variant='h6'>{review.name}</Typography>
              <ReviewRating rating={review.rating} />
            </div>
            <ReviewInfo user={review.user} date={review.date} />
            <div
              style={{
                height: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginBottom: 10,
              }}
            >
              {review.body.split("\n").map((part, index) => (
                <Typography key={index} variant='body2' gutterBottom>
                  {part}
                </Typography>
              ))}
            </div>
            <Typography variant='button'>Read More</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
