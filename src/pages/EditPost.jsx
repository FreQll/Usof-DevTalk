import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm/PostForm";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import PostsService from "../API/PostsService";

const EditPost = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    PostsService.getPostById(id).then((response) => {
      if (response.data.author_id !== user?.id || !user) {
        navigate("/");
      }
      setPostFormState((prevState) => ({
        ...prevState,
        content: response.data.content,
        title: response.data.title,
        status: response.data.status,
      }));
    });
  }, [id]);

  const [postFormState, setPostFormState] = useState({
    content: "",
    title: "",
    error: "",
    category: [],
    status: "",
  });

  const editPost = async (e) => {
    e.preventDefault();

    PostsService.updatePost(
      id,
      postFormState.title,
      postFormState.content,
      postFormState.status
    )
      .then(() => {
        navigate(`/post/${id}`);
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

  return (
    <div>
      <Container>
        <Typography variant="h3">Edit Post</Typography>

        <PostForm
          formData={postFormState}
          onFormChange={handleFormChange}
          onSubmit={editPost}
          setPostFormState={setPostFormState}
          isEdit={true}
        />
      </Container>
    </div>
  );
};

export default EditPost;
