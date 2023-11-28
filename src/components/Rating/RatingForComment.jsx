import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Rating.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import CommentsService from "../../API/CommentsService";

const RatingForComment = ({ comment_id, rating, showMessage }) => {
  const user = useSelector(selectUser);
  const [isLiked, setIsLiked] = useState([{ like: false, dislike: false }]);
  const [commentRating, setCommentRating] = useState(rating);

  const sendLike = async (type, isCreating) => {
    let isLikeDeleted = false;
    try {
      if (isLiked[0].like || isLiked[0].dislike) {
        await CommentsService.deleteLikeFromComment(comment_id);
        if (type === "like") {
          setCommentRating(commentRating - 1);
          isLikeDeleted = true;
        }
        if (type === "dislike") {
          setCommentRating(commentRating + 1);
          isLikeDeleted = true;
        }
        setIsLiked([{ like: false, dislike: false }]);
      }
      if (isCreating) {
        await CommentsService.createLikeUnderComment(
          comment_id,
          type,
          user?.id
        );
        if (type === "like") {
          setIsLiked([{ like: true, dislike: false }]);
          isLikeDeleted
            ? setCommentRating(commentRating + 2)
            : setCommentRating(commentRating + 1);
        }
        if (type === "dislike") {
          setIsLiked([{ like: false, dislike: true }]);
          isLikeDeleted
            ? setCommentRating(commentRating - 2)
            : setCommentRating(commentRating - 1);
        }
      }
    } catch (error) {
      showMessage(error.response.data.message, "error");
    }
  };

  useEffect(() => {
    CommentsService.getLikesUnderComment(comment_id).then((response) => {
      response.data.forEach((like) => {
        console.log(like);
        if (like.user_id === user?.id) {
          if (like.type === "like") {
            setIsLiked([{ like: true, dislike: false }]);
          } else {
            setIsLiked([{ like: false, dislike: true }]);
          }
        }
      });
    });
  }, [comment_id, user?.id]);

  return (
    <div className="rating-container">
      {isLiked[0].like ? (
        <Tooltip title="Like" placement="top">
          <IconButton
            sx={{ rotate: "180deg" }}
            onClick={() => sendLike("like", false)}
            color="primary"
          >
            <ArrowDropDownCircleIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Like" placement="top">
          <IconButton
            sx={{ rotate: "180deg" }}
            onClick={() => sendLike("like", true)}
            color="primary"
          >
            <ArrowDropDownCircleOutlined />
          </IconButton>
        </Tooltip>
      )}

      <Typography variant="h5">{commentRating}</Typography>

      {isLiked[0].dislike ? (
        <Tooltip title="Dislike" placement="bottom">
          <IconButton
            onClick={() => sendLike("dislike", false)}
            color="primary"
          >
            <ArrowDropDownCircleIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Dislike" placement="bottom">
          <IconButton onClick={() => sendLike("dislike", true)} color="primary">
            <ArrowDropDownCircleOutlined />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default RatingForComment;
