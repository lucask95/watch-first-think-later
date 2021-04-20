import { Typography } from "@material-ui/core";
import React from "react";

export default function ReviewInfo({ date, user }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <Typography variant='caption' gutterBottom>
        {date} by{" "}
        <span
          style={{
            fontWeight: "bold",
            fontStyle: "italic",
            textTransform: "capitalize",
          }}
        >
          {user}
        </span>
      </Typography>
    </div>
  );
}
