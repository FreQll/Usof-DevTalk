import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { Container, Divider, Typography } from "@mui/material";
import CategoryForm from "../components/CategoryForm/CategoryForm";

const CreateCategory = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== "admin") {
      navigate("/");
    }
  }, []);

  return (
    <Container sx={{ mb: 8 }}>
      <Typography sx={{ mb: 1 }} variant="h3">
        Create New Category
      </Typography>
      <Divider />

      <CategoryForm />
    </Container>
  );
};

export default CreateCategory;
