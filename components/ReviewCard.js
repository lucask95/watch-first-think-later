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

const useStyles = makeStyles({
  card: {
    boxSizing: "border-box",
    border: "1px solid white",
    transition: "border .15s, color .15s",
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
      <Card key={review._id} className={classes.card}>
        <CardActionArea>
          <CardContent style={{ paddingBottom: 16 }}>
            <Typography variant='h6'>{review.name}</Typography>
            <Typography variant='subtitle2' gutterBottom>
              {review.date}
            </Typography>
            <Typography
              variant='body2'
              style={{
                height: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              gutterBottom
            >
              {review.body}
            </Typography>
            <Typography variant='button'>Read More</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
