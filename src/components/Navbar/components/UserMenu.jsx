import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../store/userSlice";
import AuthService from "../../../API/AuthService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddIcon from "@mui/icons-material/Add";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    handleClose();
    dispatch(logout());
    AuthService.logout();
    navigate(0);
  };

  const handleGoToEdit = (e) => {
    e.preventDefault();
    handleClose();
    navigate(`user/${user.id}/edit-profile`);
  };

  const handleClickOnMyAccount = (e) => {
    e.preventDefault();
    handleClose();
    navigate(`user/${user.login}`);
  };

  const handleGoAdmin = (e) => {
    e.preventDefault();
    handleClose();
    navigate(`/admin-panel`);
  };

  const handleGoNewPost = (e) => {
    e.preventDefault();
    handleClose();
    navigate(`/posts/create-new-post`);
  };

  const user = useSelector(selectUser);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="medium"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 42, height: 42 }}
              src={`http://localhost:3001/api/users/avatar/${user.login}.jpg`}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 19,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClickOnMyAccount}>
          <Avatar
            src={`http://localhost:3001/api/users/avatar/${user.login}.jpg`}
          />{" "}
          My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleGoNewPost}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Ask New Question
        </MenuItem>
        {user.role === "admin" && (
          <MenuItem onClick={handleGoAdmin}>
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            Admin Panel
          </MenuItem>
        )}
        <MenuItem onClick={handleGoToEdit}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Edit Profile
        </MenuItem>
        <MenuItem onClick={(e) => handleLogout(e)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
