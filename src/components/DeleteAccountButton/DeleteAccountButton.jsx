import { Button } from "@mui/material";
import React from "react";

const DeleteAccountButton = ({ id, setDialogOpen }) => {
  const handleDelete = () => {
    setDialogOpen(true);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleDelete} color="error">
        Delete Account
      </Button>
    </div>
  );
};

export default DeleteAccountButton;
