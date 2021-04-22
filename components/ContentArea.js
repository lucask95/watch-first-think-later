import { Typography } from "@material-ui/core";
import React from "react";

export default function ContentArea({ header, children }) {
  return (
    <div style={{ borderRadius: 5, padding: 20, backgroundColor: "white" }}>
      {header && (
        <Typography variant="h5" gutterBottom>
          {header}
        </Typography>
      )}
      {children}
    </div>
  );
}
