import { Box, Grid } from "@mui/material";
import React from "react";
import UserItem from "./UserItem";

const AllUsers = ({ users }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {users.map((user) => {
          return (
            <Grid key={user.user_id} item xs={12} sm={6} md={4} lg={3}>
              <UserItem {...user} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AllUsers;
