import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostsList from "../components/Posts/PostsList";
import PostsService from "../API/PostsService";
import MyPagination from "../components/MyPagination";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, setTotalPosts } from "../store/postSlice";
import { logout } from "../store/userSlice";
import AuthService from "../API/AuthService";
import CategoryFilter from "../components/Filters/CategoryFilter";
import Filters from "../components/Filters/Filters";
import { Link } from "react-router-dom";
import "./css/Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const postsReducer = useSelector(selectPosts);

  const dispatch = useDispatch();

  useEffect(() => {
    PostsService.getPosts(
      postsReducer.currentPage,
      5,
      postsReducer.filters.sortBy,
      postsReducer.filters.sortOrder,
      postsReducer.filters.dateFrom,
      postsReducer.filters.dateTo,
      postsReducer.filters.statusFilter,
      postsReducer.filters.selectedCategory,
      postsReducer.filters.search
    ).then((response) => {
      AuthService.whoAmI().then((res) => {
        if (!res) {
          dispatch(logout());
        }
      });
      dispatch(setTotalPosts(response.data.totalCount));
      setPosts(response.data.posts);
    });
  }, [
    postsReducer.currentPage,
    dispatch,
    postsReducer.filters.sortBy,
    postsReducer.filters.sortOrder,
    postsReducer.filters.dateFrom,
    postsReducer.filters.dateTo,
    postsReducer.filters.statusFilter,
    postsReducer.filters.selectedCategory,
    postsReducer.filters.search,
  ]);

  return (
    <div>
      <Container>
        <div className="filters-container">
          <Link className="ask-button" to={"/posts/create-new-post"}>
            <Button variant="contained">Ask Question</Button>
          </Link>
          <div>
            <CategoryFilter />
            <Filters />
          </div>
        </div>
      </Container>

      <Container sx={{ mb: 10 }}>
        {postsReducer.currentPage === 1 && (
          <Typography variant="h4" sx={{ mb: 3 }}>
            Top Questions
          </Typography>
        )}
        {posts ? <PostsList posts={posts} /> : <Box>There is no posts :(</Box>}
        <div className="pagination">
          <MyPagination />
        </div>
      </Container>
    </div>
  );
};

export default Home;
