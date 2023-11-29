import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import UserService from "../../API/UserService";
import { IconButton, Tooltip } from "@mui/material";

const FavoriteButton = ({ postId, isFavoritePost }) => {

  const [isFavorite, setIsFavorite] = useState(isFavoritePost);

  const addToFavorite = async () => {
    setIsFavorite(true);
    await UserService.addToFavorites(postId)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteFromFavorite = async () => {
    setIsFavorite(false);
    await UserService.deleteFromFavorites(postId)
      .then((response) => {
      })
      .catch((error) => {
        console.error(error);
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
