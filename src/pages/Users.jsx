import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserService from "../API/UserService";
import AllUsers from "../components/Users/AllUsers";

const Users = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        UserService.getAllUsers().then((response) => {
            setUsers(response.data);
        });
    }, []);

  return (
    <Container sx={{mb: 8}}>
      <Typography variant="h4" sx={{ mb: "20px" }}>
        All Users
      </Typography>

        {users && <AllUsers users={users} />}
    </Container>
  );
};

export default Users;
