import {
  Avatar,
  Button,
  Chip,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from "../API/UserService";
import "./css/UserPage.css";
import PostRating from "../components/Rating/PostRating";
import PostsService from "../API/PostsService";
import PostsList from "../components/Posts/PostsList";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import PageNotFound from "./PageNotFound";

const UserPage = () => {
  const { login } = useParams();
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [posts, setPosts] = useState();

  const loggedUser = useSelector(selectUser);

  useEffect(() => {
    UserService.getUserByLogin(login)
      .then(async (data) => {
        await setUser(data.data);

        await PostsService.getUserPostsById(data.data.user_id)
          .then((postData) => {
            setPosts(postData.data.posts);
          })
          .catch((e) => setError(e.response.data.message));
      })
      .catch((e) => setError(e.response.data.message));
  }, [login]);

  return (
    <Container>
      {user && (
        <div className="user-global-container">
          <div className="user-page-container">
            <div className="user-info-container">
              <Avatar
                sx={{ width: "160px", height: "160px", mb: 2 }}
                alt="user"
                src={`http://localhost:3001/api/users/avatar/${user.login}.jpg`}
              />
              <Typography sx={{ mb: 1 }} variant="h5">
                {user.full_name}
              </Typography>
              <div className="login-and-role">
                <Typography variant="body1">{user.login}</Typography>
                <Chip label={user.role} />
              </div>
            </div>

            <PostRating rating={user.rating} />

            {loggedUser?.login === user.login && (
              <Link to={`/user/${user.user_id}/edit-profile`}>
                <Button variant="contained">Edit Profile</Button>
              </Link>
            )}

            <Typography variant="h6">
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </Typography>
          </div>

          {posts?.length !== 0 && <Divider orientation="vertical" flexItem />}

          {posts?.length !== 0 && (
            <div className="user-posts-container">
              <Typography sx={{ mb: 2, ml: 3 }} variant="h4">
                {user.login} Questions
              </Typography>
              {posts ? <PostsList posts={posts} /> : <div>No posts</div>}
            </div>
          )}
        </div>
      )}
      {error && <PageNotFound />}
    </Container>
  );
};

export default UserPage;
