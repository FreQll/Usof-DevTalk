import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./UserForm.css";
import UserService from "../../API/UserService";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    UserService.createUser(login, password, full_name, email, role)
      .then((res) => {
        navigate("/admin-panel");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <form className="user-form" onSubmit={onSubmit}>
      <div className="form-title-part">
        <Typography variant="body1">Login</Typography>
        <TextField
          label="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          variant="outlined"
          required
          fullWidth
        />
      </div>

      <div className="form-title-part">
        <Typography variant="body1">Password</Typography>
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          required
          type="password"
          fullWidth
        />
      </div>

      <div className="form-title-part">
        <Typography variant="body1">Full Name</Typography>
        <TextField
          label="Full Name"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
          variant="outlined"
          required
          fullWidth
        />
      </div>

      <div className="form-title-part">
        <Typography variant="body1">Email</Typography>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          required
          fullWidth
        />
      </div>

      <div className="form-title-part">
        <Typography variant="body1">Role</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            value={role}
            label="Role"
            onChange={handleRoleChange}
            required
          >
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"admin"}>Admin</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Button variant="contained" type="sumbit">
        Create User
      </Button>
    </form>
  );
};

export default UserForm;
