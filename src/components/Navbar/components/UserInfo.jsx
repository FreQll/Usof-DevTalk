import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/userSlice";
import Logout from "./Logout";
import { Button } from "@mui/material/";
import { Link } from "react-router-dom";
import UserPhoto from "../../UserPhoto/UserPhoto";

const UserInfo = () => {
  const user = useSelector(selectUser);

  return (
    <Box >
      {user ? (
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "25px"}}>
         <UserPhoto login={user.login}/>
         <Typography variant="h6">{user.role}</Typography>
          <Logout />
        </Box>
      ) : (
        <Link to="/login">
          <Button variant="outlined">Log in</Button>
        </Link>
      )}
    </Box>
  );
};

export default UserInfo;
