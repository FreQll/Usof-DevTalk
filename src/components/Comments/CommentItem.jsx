import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import "./Comments.css";
import CommentsService from "../../API/CommentsService";
import CustomSnackbar from "../CustomSnackbar";
import MarkdownBlock from "../MarkdownBlock";
import { useNavigate } from "react-router-dom";
import MarkdownPreview from "../MarkdownPreview";
import RatingForComment from "../Rating/RatingForComment";

const CommentItem = ({
  comment_id,
  publish_date,
  content,
  rating,
  edit,
  setEdit,
}) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [editField, setEditField] = useState(content);

  const showMessage = (message, type) => {
    setSeverity(type);
    setOpen(true);
    setMessage(message);
  };

  const editComment = async () => {
    if (editField) {
      await CommentsService.editComment(comment_id, editField)
        .then((response) => {
          console.log(response);
          setEdit(null);
          navigate(0);
        })
        .catch((error) => {
          showMessage(error.response.data.message, "error");
        });
    } else {
      showMessage("Comment can't be empty", "error");
    }
  };

  return (
    <div className="comment-item">
      <div className="comment-content-container">
        {!edit ? (
          <MarkdownBlock content={content} />
        ) : (
          <div className="edit-comment-container">
            <TextField
              multiline
              fullWidth
              rows={6}
              defaultValue={content}
              onChange={(e) => setEditField(e.target.value)}
            />

            <div>
              <Button onClick={() => setEdit(null)}>Cancel</Button>
              <Button onClick={editComment} variant="contained">
                Save
              </Button>
            </div>
            <MarkdownPreview content={editField} />
          </div>
        )}
        <Typography sx={{ mt: "10px", fontStyle: "italic" }} variant="body2">
          {formatDate(publish_date)}
        </Typography>
      </div>
      <div>
        <RatingForComment
          comment_id={comment_id}
          rating={rating}
          showMessage={showMessage}
        />
      </div>

      <CustomSnackbar
        severity={severity}
        message={message}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default CommentItem;
