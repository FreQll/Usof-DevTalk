import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostsService from "../API/PostsService";
import { Alert, Box, Container, Divider, Typography } from "@mui/material";
import { formatDate } from "../utils/formatDate";
import UserPhoto from "../components/UserPhoto/UserPhoto";
import UserService from "../API/UserService";
import CommentsList from "../components/Comments/CommentsList";
import Rating from "../components/Rating/Rating";
import "./css/PostPage.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../store/userSlice";
import CommentForm from "../components/Comments/CommentForm";
import CustomSnackbar from "../components/CustomSnackbar";
import PageNotFound from "./PageNotFound";
import EditAndDeleteButtons from "../components/EditAndDeleteButtons";
import CategoriesService from "../API/CategoriesService";
import CategoriesList from "../components/Categories/CategoriesList";
import MarkdownBlock from "../components/MarkdownBlock";
import AuthService from "../API/AuthService";
import FavoriteButton from "../components/Posts/FavoriteButton";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [author, setAuthor] = useState();
  const [comments, setComments] = useState();
  const [commentsAuthors, setCommentsAuthors] = useState();
  const [categories, setCategories] = useState([]);

  const [postFound, setPostFound] = useState(true);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [isPostFavorite, setIsPostFavorite] = useState(null);

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const postResponse = await PostsService.getPostById(id);
        if (!postResponse.data) {
          setPostFound(false);
        }
        await setPost(postResponse.data);

        if (postResponse.data && postResponse.data.author_id) {
          const authorResponse = await UserService.getUserById(
            postResponse.data.author_id
          );
          await setAuthor(authorResponse.data);
        }

        const commentsResponse = await PostsService.getCommentsUnderPost(id);
        await setComments(commentsResponse.data);

        if (commentsResponse.data) {
          const commentsAuthorsTemp = await Promise.all(
            commentsResponse.data.map(async (comment) => {
              const commentAuthorResponse = await UserService.getUserById(
                comment.author_id
              );
              return commentAuthorResponse.data;
            })
          );
          setCommentsAuthors(commentsAuthorsTemp);
        }
      } catch (e) {
        console.log(e.response.data.message);
      }
    }

    CategoriesService.getCategoriesForPost(id).then((response) => {
      setCategories(response.data);
    });

    fetchData();
  }, [id]);

  useEffect(() => {
    AuthService.whoAmI().then((res) => {
      if (!res) {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    UserService.getFavoritePosts(user?.id).then(async (response) => {
      let isFavorite = false;
      await response.data.forEach(async (post) => {
        if (Number(post.post_id) === Number(id)) {
          isFavorite = true;
        }
      });
      setIsPostFavorite(isFavorite);
    });
  }, [post, user?.id, id]);

  const showMessage = (message, type) => {
    setSeverity(type);
    setOpen(true);
    setMessage(message);
  };

  const sendLike = async (type) => {
    try {
      await PostsService.createLikeUnderPost(id, type, user?.id);
      post.rating = type === "like" ? post.rating + 1 : post.rating - 1;
      showMessage(`${type} sent!`, "success");
    } catch (error) {
      showMessage(error.response.data.message, "error");
    }
  };

  const deleteLike = async () => {
    if (!user) {
      showMessage("Unauthorized", "error");
      return;
    }
    try {
      await PostsService.deleteLikeUnderPost(id);
      showMessage("Like deleted!", "success");
    } catch (error) {
      showMessage(error.response.data.message, "error");
    }
  };

  const deletePost = async () => {
    if (user?.id !== post.author_id) {
      showMessage("Unauthorized", "error");
      return;
    }
    PostsService.deletePost(id)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        showMessage(error.response.data.message, "error");
      });
  };

  return (
    <Container>
      {post && author && comments && (
        <Box>
          <div className="post-header">
            <div>
              <Typography variant="h3">{post.title}</Typography>

              <Typography variant="body2">
                Asked {formatDate(post.publish_date)}
              </Typography>

              {isPostFavorite !== null && user?.id && (
                <FavoriteButton
                  postId={post.post_id}
                  isFavoritePost={isPostFavorite}
                />
              )}
            </div>
            {user?.id === post.author_id && (
              <EditAndDeleteButtons
                dialogContent={
                  "Do you really want to delete the post and everything related to it? The action is irreversible."
                }
                editAction={() => navigate(`/post/${id}/edit-post`)}
                deleteAction={deletePost}
              />
            )}
          </div>

          <Divider sx={{ mt: "20px", mb: "20px" }} />

          <div className="info">
            <div>
              <UserPhoto login={author.login} />
              <Typography variant="body2">{author.full_name}</Typography>
            </div>
            <div className="categories-list">
              <CategoriesList categories={categories} />
            </div>
          </div>
          <div className="content-block">
            <Rating
              rating={post.rating}
              likeAction={() => sendLike("like")}
              dislikeAction={() => sendLike("dislike")}
              deleteLikeAction={() => deleteLike()}
            />
            <Container sx={{pr: 5}}>
              <MarkdownBlock content={post.content} />
            </Container>
          </div>

          <Divider sx={{ mt: "20px", mb: "20px" }} />

          <Typography variant="h5">Comments:</Typography>

          {user ? (
            <CommentForm post_id={id} />
          ) : (
            <Alert sx={{ mt: "20px", mb: "20px" }} severity="info">
              You need to be authorized to leave comment!
            </Alert>
          )}

          {comments.length ? (
            <CommentsList author={commentsAuthors} comments={comments} />
          ) : (
            <Typography sx={{mb: 5}} variant="body1">No comments yet...</Typography>
          )}
        </Box>
      )}

      {!postFound && <PageNotFound />}

      <CustomSnackbar
        severity={severity}
        message={message}
        open={open}
        setOpen={setOpen}
      />
    </Container>
  );
};

export default PostPage;
