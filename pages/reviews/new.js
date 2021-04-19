import { Button, TextField, Typography } from "@material-ui/core";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import reviewModel from "../../models/ReviewModel";
import appConstants from "../../util/constants";

export default function Home() {
  const [session, loading] = useSession();
  const [formErrors, setFormErrors] = useState({});
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    let newReview = JSON.parse(JSON.stringify(reviewModel));
    const date = new Date().toISOString().slice(0, 10);
    const user = session.user.username;

    newReview = {
      ...newReview,
      name: title,
      year,
      rating: rating / 2,
      body,
      date,
      user,
    };

    try {
      const res = await fetch("https://localhost:3000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });
      const response = await res.json();
      if (response.ok) setSuccess(true);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const errors = {};

    if (title.length < 1) errors.title = "Title is required";
    if (year.length < 1) errors.year = "Year is required";
    if (body.length < 1) errors.body = "Review is required";

    setFormErrors(errors);
  }, [title, year, body]);

  return (
    <Layout titleAddition='New Review'>
      <div style={appConstants.contentArea}>
        <Typography variant='h5' gutterBottom>
          New Review
        </Typography>

        {session && session?.user?.canPost ? (
          <form onSubmit={submitReview} style={{ padding: 20 }}>
            <div
              style={{
                display: "grid",
                gap: 20,
                gridTemplateColumns: "1fr 200px",
                marginBottom: 10,
              }}
            >
              <TextField
                required
                label='Film Title'
                error={formErrors.title ? true : false}
                helperText={formErrors.title ?? undefined}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                disabled={submitting}
              />
              <TextField
                required
                label='Year'
                type='number'
                error={formErrors.year ? true : false}
                helperText={formErrors.year ?? undefined}
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                disabled={submitting}
              />
            </div>
            <div
              style={{
                marginBottom: 20,
              }}
            >
              <TextField
                label='Rating'
                type='number'
                value={rating}
                onChange={(e) => {
                  const newVal = parseInt(e.target.value);
                  if (
                    e.target.value.length < 1 ||
                    (newVal >= 1 && newVal <= 10)
                  )
                    setRating(e.target.value);
                }}
                disabled={submitting}
              />
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <TextField
                required
                multiline
                fullWidth
                rows={5}
                variant='outlined'
                label='Review'
                error={formErrors.body ? true : false}
                helperText={formErrors.body ?? undefined}
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
                disabled={submitting}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Button
                variant='contained'
                color='primary'
                disabled={Object.keys(formErrors).length > 0 || submitting}
                type='submit'
              >
                Submit Review
              </Button>
            </div>
          </form>
        ) : (
          <Typography>
            You do not have permission to make a new post.
          </Typography>
        )}
      </div>
    </Layout>
  );
}
