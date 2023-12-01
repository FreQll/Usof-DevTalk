import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import React, { useEffect } from "react";
import AuthService from "../API/AuthService";
import { useState } from "react";
import styles from "./css/login.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../store/userSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import UserService from "../API/UserService";

const Login = () => {
  const [user_login, setUserLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(user_login, password);
      const decoded = await jwtDecode(response.data.token);
      const userByLogin = await UserService.getUserByLogin(decoded.login);
      const userId = userByLogin.data.user_id;
      await dispatch(
        login({
          id: userId,
          login: decoded.login,
          email: decoded.email,
          role: decoded.role,
          token: response.data.token,
          loggedIn: true,
        })
      );
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 5 }} style={{ textAlign: "center" }}>
        <Typography variant="h2">Log In</Typography>

        <form
          action=""
          method="post"
          className={styles.login_form}
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            value={user_login}
            onChange={(e) => {
              setUserLogin(e.target.value);
            }}
            label="Login"
            variant="outlined"
            required
          />
          <TextField
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            label="Password"
            variant="outlined"
            autoComplete="current-password"
            required
          />

          {error && <Alert severity="error">{error}</Alert>}

          <Button variant="contained" type="submit">
            Log In
          </Button>
        </form>

        <div className={styles.links}>
          <Link to="/reset-password">
            <Typography variant="body1">Forgot password?</Typography>
          </Link>

          <Link to="/register">
            <Typography variant="body1">
              Don't have an account? Register here!
            </Typography>
          </Link>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
