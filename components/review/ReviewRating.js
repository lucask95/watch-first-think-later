import { Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";

export default function ReviewRating({ rating }) {
  return rating == 0 ? (
    <Typography
      variant='subtitle2'
      style={{ fontStyle: "italic", color: "darkgray", whiteSpace: "nowrap" }}
      gutterBottom
    >
      No Rating
    </Typography>
  ) : (
    <div style={{ marginBottom: 10 }}>
      <Rating value={rating} precision={0.5} readOnly />
    </div>
  );
}
