import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CategoriesService from "../../API/CategoriesService";
import { useNavigate } from "react-router-dom";

const CategoryForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    CategoriesService.createCategory(title, description)
      .then((res) => {
        navigate("/admin-panel");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="user-form" onSubmit={onSubmit}>
      <div className="form-title-part">
        <Typography variant="body1">Title</Typography>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          required
          fullWidth
        />
      </div>

      <div className="form-title-part">
        <Typography variant="body1">Description</Typography>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          required
          multiline
          rows={2}
          fullWidth
        />
      </div>
      <Button variant="contained" type="sumbit">
        Create Category
      </Button>
    </form>
  );
};

export default CategoryForm;
