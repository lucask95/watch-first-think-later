import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import React from "react";

export default function ReviewCard({ review }) {
  return (
    <Card key={review._id}>
      <CardContent>
        <Typography variant="h6">{review.name}</Typography>
        <Typography variant="subtitle2" gutterBottom>
          {review.date}
        </Typography>
        <Typography
          variant="body2"
          style={{
            height: 100,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {review.body}
        </Typography>
      </CardContent>
      <CardActions style={{ padding: "0 16px 16px" }}>
        <Link href={`/reviews/${review._id}`}>
          <Button color="primary" style={{ textDecoration: "underline" }}>
            Read More &rarr;
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
