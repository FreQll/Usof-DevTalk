import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Rating.css";
import PostsService from "../../API/PostsService";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

const RatingForPost = ({ post_id, rating, showMessage }) => {
  const user = useSelector(selectUser);
  const [isLiked, setIsLiked] = useState([{ like: false, dislike: false }]);
  const [postRating, setPostRating] = useState(rating);

  const sendLike = async (type, isCreating) => {
    let isLikeDeleted = false;
    try {
      if (isLiked[0].like || isLiked[0].dislike) {
        await PostsService.deleteLikeUnderPost(post_id);
        if (type === "like") {
          setPostRating(postRating - 1);
          isLikeDeleted = true;
        }
        if (type === "dislike") {
          setPostRating(postRating + 1);
          isLikeDeleted = true;
        }
        setIsLiked([{ like: false, dislike: false }]);
      }
      if (isCreating) {
        await PostsService.createLikeUnderPost(post_id, type, user?.id);
        if (type === "like") {
          setIsLiked([{ like: true, dislike: false }]);
          isLikeDeleted ? setPostRating(postRating + 2) : setPostRating(postRating + 1);
        }
        if (type === "dislike") {
          setIsLiked([{ like: false, dislike: true }]);
          isLikeDeleted ? setPostRating(postRating - 2) : setPostRating(postRating - 1);
        }
      }

    } catch (error) {
        showMessage(error.response.data.message, "error");
    }
  };

  useEffect(() => {
    PostsService.getLikesUnderPost(post_id).then((response) => {
      response.data.forEach((like) => {
        if (like.user_id === user?.id) {
          if (like.type === "like") {
            setIsLiked([{ like: true, dislike: false }]);
          } else {
            setIsLiked([{ like: false, dislike: true }]);
          }
        }
      });
    });
  }, [post_id, user?.id]);

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

      <Typography variant="h5">{postRating}</Typography>

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
        <Tooltip title="Like" placement="bottom">
          <IconButton onClick={() => sendLike("dislike", true)} color="primary">
            <ArrowDropDownCircleOutlined />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default RatingForPost;
