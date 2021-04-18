import { Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import userModel from "../models/UserModel";
import Link from "next/link";

export default function register() {
  const [formErrors, setFormErrors] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitRegister = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    let newUser = JSON.parse(JSON.stringify(userModel));
    newUser = { ...newUser, username, password, email };

    try {
      const res = await fetch("https://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const response = await res.json();
      if (response.ok) setSuccess(true);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  // form validation
  useEffect(() => {
    const errors = {};

    if (username.length < 3)
      errors.username = "Username must be greater than 2 characters.";
    else if (username.length > 20)
      errors.username = "Username must be less than 21 characters.";
    if (password.length < 6)
      errors.password = "Password must be greater than 5 characters.";
    else if (password.length > 50)
      errors.password = "Password must be less than 51 characters.";
    if (email.length < 5)
      errors.email = "Email Address must be greater than 4 characters.";
    else if (email.length > 100)
      errors.email = "Email Address must be less than 101 characters.";

    setFormErrors(errors);
  }, [username, password, email]);

  return (
    <Layout>
      <div style={{ padding: 20, borderRadius: 5, backgroundColor: "white" }}>
        <Typography variant='h5'>Register</Typography>
        {success ? (
          <div style={{ padding: 20 }}>
            <Typography>
              Successfully registered! You may now{" "}
              <Link href='/api/auth/signin?callbackUrl=https%3A%2F%2Flocalhost%3A3000%2F'>
                <a>sign in.</a>
              </Link>
            </Typography>
          </div>
        ) : (
          <form onSubmit={submitRegister} style={{ padding: 20 }}>
            <div style={{ marginBottom: 10 }}>
              <TextField
                required
                label='Username'
                error={formErrors.username ? true : false}
                helperText={formErrors.username ?? undefined}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                disabled={submitting}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <TextField
                required
                label='Password'
                type='password'
                error={formErrors.password ? true : false}
                helperText={formErrors.password ?? undefined}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                disabled={submitting}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <TextField
                label='Email Address'
                error={formErrors.email ? true : false}
                helperText={formErrors.email ?? undefined}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
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
                Register
              </Button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}