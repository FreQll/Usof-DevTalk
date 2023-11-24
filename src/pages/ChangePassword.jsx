import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./css/login.module.css";
import AuthService from "../API/AuthService";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

const ChangePassword = () => {
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
        setError("Passwords don't match");
        return;
    }

    try {
      await AuthService.setNewPassword(newPassword, id, token);
      dispatch(logout())
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Container sx={{ width: "90%" }}>
      <Paper elevation={4} sx={{ p: 5 }} style={{ textAlign: "center" }}>
        <Typography variant="h2">Change Password</Typography>

        <form
          action=""
          className={styles.login_form}
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            id="outlined-basic"
            label="New Password"
            type="password"
            variant="outlined"
            required
          />

          <TextField
            value={confirmNewPassword}
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
            }}
            id="outlined-basic"
            label="Confirm New Password"
            type="password"
            variant="outlined"
            required
          />

          {error && <Alert severity="error">{error}</Alert>}

          <Button variant="outlined" type="submit">
            Change Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
