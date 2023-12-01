import {
  Alert,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./css/login.module.css";
import { Link } from "react-router-dom";
import AuthService from "../API/AuthService";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await AuthService.resetPassword(email);
        setSuccess("Email sent succefully! Check your inbox.");
        setError("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Container sx={{ width: "90%" }}>
      <Paper elevation={4} sx={{ p: 5 }} style={{ textAlign: "center" }}>
        <Typography variant="h2">Reset Password</Typography>
        <Typography variant="body1">
          Lost your password? Please enter your email address. You will receive
          a link to create a new password via email.
        </Typography>

        <form
          action=""
          className={styles.login_form}
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="Email"
            type="email"
            variant="outlined"
            required
          />

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <Button variant="outlined" type="submit">
            Reset Password
          </Button>
        </form>

        <Link to="/login">
          <Typography variant="body1" sx={{ mt: "20px" }}>
            Remember your password?
          </Typography>
        </Link>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
