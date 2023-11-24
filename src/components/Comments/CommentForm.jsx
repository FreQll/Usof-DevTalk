import { Alert, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Comments.css";
import PostsService from "../../API/PostsService";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import CustomDialog from "../Dialog/CustomDialog";
import MarkdownPreview from "../MarkdownPreview";

const CommentForm = ({ post_id }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const user = useSelector(selectUser);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const discardDraft = () => {
    setOpen(false);
    setComment("");
  };

  const postAnswer = async () => {
    try {
      await PostsService.createCommentUnderPost(post_id, comment, user.id);
      navigate(0);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="comment-form">
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Your answer"
        multiline
        rows={8}
        variant="filled"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
      />

      <div className="comment-form-buttons">
        <Button variant="contained" onClick={postAnswer}>
          Post Your Answer
        </Button>
        {comment.length > 100 && (
          <Button variant="text" onClick={handleClickOpen}>
            Discard
          </Button>
        )}
      </div>

      <MarkdownPreview content={comment} />

      <CustomDialog
        open={open}
        setOpen={setOpen}
        agreeAction={discardDraft}
        dialogTitle={"Discard Draft?"}
        dialogContent={"Are you sure you want to discard your draft?"}
      />
    </div>
  );
};

export default CommentForm;
