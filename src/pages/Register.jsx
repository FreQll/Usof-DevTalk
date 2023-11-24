import React, { useEffect } from "react";
import styles from "./css/login.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import AuthService from "../API/AuthService";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";

const Register = () => {
  const [userLogin, setUserLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  const user = useSelector(selectUser);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
    }
    try {
        await AuthService.register(userLogin, password, email, fullName);
        navigate("/login");
    } catch (error) {
        setError(error.response.data.message);
    }
  }

  return (
    <Container sx={{ width: "90%", mb: 6 }}>
      <Paper elevation={4} sx={{ p: 5 }} style={{ textAlign: "center" }}>
        <Typography variant="h2">Register</Typography>

        <form
          action=""
          method="post"
          className={styles.login_form}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <TextField
            value={userLogin}
            onChange={(e) => {
              setUserLogin(e.target.value);
            }}
            id="outlined-basic"
            label="Login"
            variant="outlined"
            required
          />

          <TextField
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            required
          />
          <TextField
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="outlined-basic"
            type="password"
            label="Password"
            variant="outlined"
            autoComplete="current-password"
            required
          />
          <TextField
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            id="outlined-basic"
            type="password"
            label="Confirm password"
            variant="outlined"
            autoComplete="current-password"
            required
          />

          <TextField
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            required
          />

          {error && <Alert severity="error">{error}</Alert>}

          <Button variant="contained" type="submit">
            Register
          </Button>
        </form>

        <Link to="/login">
          <Typography variant="body1" sx={{ mt: "20px" }}>
            Already have an account? Sign in
          </Typography>
        </Link>
      </Paper>
    </Container>
  );
};

export default Register;
