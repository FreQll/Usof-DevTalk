import { Button } from "@mui/material";
import React from "react";

const DeleteAccountButton = ({ id, setDialogOpen }) => {
  const handleDelete = () => {
    setDialogOpen(true);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleDelete}>
        Delete Account
      </Button>
    </div>
  );
};

export default DeleteAccountButton;
