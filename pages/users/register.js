import { Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import userModel from "../../models/UserModel";

export default function register() {
  const [formErrors, setFormErrors] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const submitRegister = async (e) => {
    e.preventDefault();

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
      const data = await res.json();
    } catch (error) {
      console.error(error);
    }
  };

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

    setFormErrors(errors);
  }, [username, password]);

  return (
    <Layout>
      <div style={{ padding: 20, borderRadius: 5, backgroundColor: "white" }}>
        <Typography variant='h5'>Register</Typography>
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
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <TextField
              label='Email Address'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <Button
              variant='contained'
              color='primary'
              disabled={Object.keys(formErrors).length ? true : false}
              type='submit'
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
