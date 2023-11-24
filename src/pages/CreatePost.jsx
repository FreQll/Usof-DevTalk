import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostForm from "../components/PostForm/PostForm";
import PostsService from "../API/PostsService";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const [postFormState, setPostFormState] = useState({
    content: "",
    title: "",
    category: [],
    error: "",
  });

  const postQuestion = async (e) => {
    e.preventDefault();
    if (!user) {
      setPostFormState((prevState) => ({
        ...prevState,
        error: "You must be logged in to post a question",
      }));
      return;
    }
    PostsService.createNewPost(
      postFormState.title,
      postFormState.content,
      user.id,
      postFormState.category.length === 1
        ? postFormState.category[0]
        : postFormState.category
    )
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        setPostFormState((prevState) => ({
          ...prevState,
          error: error.response.data.message,
        }));
      });
  };

  const handleFormChange = (field, value) => {
    setPostFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Container sx={{mb: 8}}>
      <Typography variant="h3">Ask New Question</Typography>

      <PostForm
        formData={postFormState}
        onFormChange={handleFormChange}
        onSubmit={postQuestion}
        setPostFormState={setPostFormState}
      />
    </Container>
  );
};

export default CreatePost;
