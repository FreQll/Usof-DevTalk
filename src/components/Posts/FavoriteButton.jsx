import React, { useState } from "react";
import { selectUser } from "../../store/userSlice";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import UserService from "../../API/UserService";
import { IconButton, Tooltip } from "@mui/material";

const FavoriteButton = ({ postId, isFavoritePost }) => {
  const user = useSelector(selectUser);

  const [isFavorite, setIsFavorite] = useState(isFavoritePost);
  console.log(isFavoritePost);

  const addToFavorite = async () => {
    setIsFavorite(true);
    console.log(postId + " " + user.id);
    await UserService.addToFavorites(postId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteFromFavorite = async () => {
    setIsFavorite(false);
    console.log(postId + " " + user.id);
    await UserService.deleteFromFavorites(postId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {isFavorite ? (
        <Tooltip title="Remove From Favorites">
          <IconButton onClick={deleteFromFavorite}>
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add To Favorites">
          <IconButton onClick={addToFavorite}>
            <FavoriteBorderIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default FavoriteButton;
