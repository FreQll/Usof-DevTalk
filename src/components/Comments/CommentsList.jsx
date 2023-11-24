import React, { useState } from "react";
import CommentItem from "./CommentItem";
import { Divider } from "@mui/material";
import UserPhoto from "../UserPhoto/UserPhoto";
import "./Comments.css";
import EditAndDeleteButtons from "../EditAndDeleteButtons";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import CommentsService from "../../API/CommentsService";
import { useNavigate } from "react-router-dom";

const CommentsList = ({ comments, author }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [editCommentId, setEditCommentId] = useState(null);

  const deleteComment = (comment) => {
    try {
      CommentsService.deleteComment(comment.comment_id);
      navigate(0);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div elevation={4}>
      {comments.length &&
        comments.map((comment, index) => (
          <div>
            <Divider />
            <div className="comment-container">
              {author && (
                <div className="comment-header">
                  <UserPhoto login={author[index].login} />
                  {author[index].login === user?.login && (
                    <EditAndDeleteButtons
                      dialogContent={
                        "Do you really want to delete the comment and everything related to it? The action is irreversible."
                      }
                      deleteAction={() => deleteComment(comment)}
                      editAction={() => setEditCommentId(comment.comment_id)}
                    />
                  )}
                </div>
              )}
              <CommentItem
                {...comment}
                {...author}
                edit={editCommentId === comment.comment_id}
                setEdit={setEditCommentId}
              />
            </div>
            <Divider />
          </div>
        ))}
    </div>
  );
};

export default CommentsList;
