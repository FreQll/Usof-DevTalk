import { Container, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import UserForm from "../components/UserForm/UserForm";
import { selectUser } from "../store/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Container sx={{ mb: 8 }}>
      <Typography sx={{ mb: 1 }} variant="h3">
        Create New User
      </Typography>
      <Divider />
      <UserForm />
    </Container>
  );
};

export default CreateUser;
