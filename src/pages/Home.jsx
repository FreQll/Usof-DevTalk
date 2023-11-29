import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostsList from "../components/Posts/PostsList";
import PostsService from "../API/PostsService";
import MyPagination from "../components/MyPagination";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, setTotalPosts } from "../store/postSlice";
import { logout } from "../store/userSlice";
import AuthService from "../API/AuthService";
import { Link } from "react-router-dom";
import "./css/Home.css";
import useQuery from "../Hooks/useQuery";
import CategoriesService from "../API/CategoriesService";
import SortOrder from "../components/Filters/SortOrder";
import SortPosts from "../components/Filters/SortPosts";
import DateFilter from "../components/Filters/DateFilter";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const postsReducer = useSelector(selectPosts);
  const dispatch = useDispatch();
  const query = useQuery();

  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    if (query.get("category")) {
      CategoriesService.getCategoryById(query.get("category")).then(
        (response) => {
          setCurrentCategory(response.data);
        }
      );
    }
    PostsService.getPosts(
      postsReducer.currentPage,
      5,
      postsReducer.filters.sortBy,
      postsReducer.filters.sortOrder,
      postsReducer.filters.dateFrom,
      postsReducer.filters.dateTo,
      postsReducer.filters.statusFilter,
      query.get("category"),
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
    query,
  ]);

  return (
    <div>
      <Container>
        <Container>
          <div className="filters-container">
            <Link className="ask-button" to={"/posts/create-new-post"}>
              <Button variant="contained">Ask Question</Button>
            </Link>
          </div>
        </Container>
      </Container>

      <Container sx={{ mb: 10 }}>
        <Container>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" >
              {query.get("category")
                ? `Questions With Category ${currentCategory.title}`
                : "Top Questions"}
            </Typography>
            {query.get("category") && (
              <Typography variant="body2" color="grey">
                {currentCategory.description}
              </Typography>
            )}
          </Box>
        </Container>

        <Container>
          <div className="sort-container">
            <div className="sort-item">
              <SortPosts />
              <SortOrder />
            </div>

            <DateFilter />
          </div>
        </Container>

        {posts ? <PostsList posts={posts} /> : <Box>There is no posts :(</Box>}
        <div className="pagination">
          <MyPagination />
        </div>
      </Container>
    </div>
  );
};

export default Home;
