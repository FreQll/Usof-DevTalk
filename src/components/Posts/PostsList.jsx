import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import UserService from "../../API/UserService";

const PostsList = (props) => {
  const [favorites, setFavorites] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          const response = await UserService.getFavoritePosts(user.id);
          const favoritePostIds = response.data.map((post) => post.post_id);
          setFavorites(favoritePostIds);
        } catch (error) {
          console.error("Error fetching favorite posts:", error);
        }
      }
    };

    fetchData();
  }, [user?.id]);

  return (
    <Container>
      {props.posts ? (
        props.posts.map((post) => (
          <PostItem
            key={`${post.post_id}`}
            post={post}
            isFavorite={user?.id ? favorites.includes(post.post_id) : false}
          />
        ))
      ) : (
        <h1>There are no posts</h1>
      )}
    </Container>
  );
};

export default PostsList;
