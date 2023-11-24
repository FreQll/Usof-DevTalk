import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserPhoto from "../UserPhoto/UserPhoto";
import CategoriesList from "../Categories/CategoriesList";
import CategoriesService from "../../API/CategoriesService";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import PostRating from "../Rating/PostRating";
import "./Posts.css";
import MarkdownBlock from "../MarkdownBlock";
import FavoriteButton from "./FavoriteButton";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

const PostItem = (props) => {
  const [categories, setCategories] = useState({});
  const user = useSelector(selectUser);

  useEffect(() => {
    CategoriesService.getCategoriesForPost(props.post.post_id).then(
      (response) => {
        setCategories(response.data);
      }
    );
  }, [props.post.post_id]);

  return (
    <Paper elevation={4} sx={{ mb: 3 }}>
      <div className="post-item-container">
        <Box sx={{ m: 3 }}>
          <div className="user-info-post">
            <div className="user-info">
              <Link to={`/post/${props.post.post_id}`}>
                <Typography variant="h4">{props.post.title}</Typography>
              </Link>

              {user?.id && (
                <FavoriteButton
                  postId={props.post.post_id}
                  isFavoritePost={props.isFavorite}
                />
              )}
            </div>

            <div className="user-info">
              <div>
                <UserPhoto login={props.post.login} />
                <Typography variant="body2">{props.post.full_name}</Typography>
              </div>
              <PostRating rating={props.post.rating} />
            </div>
          </div>

          <div className="content-preview">
            <MarkdownBlock
              content={
                props.post.content.length > 100
                  ? props.post.content.slice(0, 100) + "..."
                  : props.post.content
              }
            />
          </div>

          <div className="post-data">
            <CategoriesList categories={categories} />
            <Typography variant="body2">
              {formatDate(props.post.publish_date)}
            </Typography>
          </div>
        </Box>
      </div>
    </Paper>
  );
};

export default PostItem;
