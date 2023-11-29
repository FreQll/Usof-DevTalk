import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import UsersList from "../components/AdminPanel/UsersList";
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import "./css/AdminPanel.css";
import CategoriesGridList from "../components/AdminPanel/CategoriesGridList";
import CustomSnackbar from "../components/CustomSnackbar";

const AdminPanel = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [entity, setEntity] = useState("users");

  useEffect(() => {
    if (user === null || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  const showMessage = (message, type) => {
    setSeverity(type);
    setOpen(true);
    setMessage(message);
  };

  const handleChangeEntity = (event, newEntity) => {
    setEntity(newEntity);
  };

  return (
    <div>
      <div className="admin-panel-header">
        <Typography variant="h4" component="h4" gutterBottom>
          Admin Panel
        </Typography>

        {entity === "users" && (
          <Link to="/admin-panel/create-new-user">
            <Button variant="contained">Create User</Button>
          </Link>
        )}

        {entity === "categories" && (
          <Link to="/admin-panel/create-new-category">
            <Button variant="contained">Create Category</Button>
          </Link>
        )}
      </div>

      <div className="enitiy-group-buttons">
        <ToggleButtonGroup
          value={entity}
          exclusive
          onChange={handleChangeEntity}
          aria-label="text alignment"
        >
          <ToggleButton value="users">Users</ToggleButton>
          <ToggleButton value="categories">Categories</ToggleButton>
        </ToggleButtonGroup>
      </div>

      {entity === "users" && <UsersList showMessage={showMessage} />}

      {entity === "categories" && (
        <CategoriesGridList showMessage={showMessage} />
      )}

      <CustomSnackbar
        severity={severity}
        message={message}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default AdminPanel;
