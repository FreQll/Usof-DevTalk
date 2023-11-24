import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomDialog from "./Dialog/CustomDialog";

const EditAndDeleteButtons = ({ editAction, deleteAction, dialogContent }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <div>
        <Tooltip title="Edit Post">
          <IconButton onClick={editAction} aria-label="edit">
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Post">
          <IconButton onClick={() => setDialogOpen(true)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>

      <CustomDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        agreeAction={deleteAction}
        dialogTitle={"Delete Confirmation"}
        dialogContent={dialogContent}
      />
    </div>
  );
};

export default EditAndDeleteButtons;
