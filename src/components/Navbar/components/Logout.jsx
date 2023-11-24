import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/userSlice";
import AuthService from "../../../API/AuthService";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    AuthService.logout();
    navigate(0);
  };

  return (
    <Button variant="outlined" onClick={(e) => handleLogout(e)}>
      Log out
    </Button>
  );
};

export default Logout;
