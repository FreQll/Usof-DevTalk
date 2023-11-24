import { Avatar, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import UserService from "../../API/UserService";
import { useNavigate } from "react-router-dom";
import "./EditUserForm.css";
import DeleteAccountButton from "../DeleteAccountButton/DeleteAccountButton";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const EditUserForm = ({ login, id, setDialogOpen }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loginInput, setLoginInput] = useState(login);
  const [fullNameInput, setFullNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getUserByLogin(login).then((data) => {
      setLoginInput(data.data.login);
      setFullNameInput(data.data.full_name);
      setEmailInput(data.data.email);
    });
  }, [login]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    let changes = false;
    console.log(loginInput, emailInput, fullNameInput, selectedFile, id);
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("login", login);

        await UserService.updateAvatar(formData);
        changes = true;
      }

      if (loginInput && emailInput && fullNameInput) {
        await UserService.updateProfile(
          id,
          fullNameInput,
          emailInput,
          loginInput
        );
        changes = true;
      }

      if (changes) {
        navigate(0);
      }
    } catch (error) {
      console.error(
        "Error during upload:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="edit-user-form">
      <div>
        <Avatar
          sx={{ width: "160px", height: "160px", mb: 2 }}
          alt="user"
          src={`http://localhost:3001/api/users/avatar/${login}.jpg`}
        />
        <div className="upload-file-container">
          <Button
            fullWidth
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>
          {selectedFile && (
            <Typography variant="body1">File Selected!</Typography>
          )}
        </div>
      </div>

      <div className="user-info-edit">
        <TextField
          id="outlined-basic"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          label="Login"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={fullNameInput}
          onChange={(e) => setFullNameInput(e.target.value)}
          label="Full Name"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          label="Email"
          variant="outlined"
        />
      </div>

      <Button variant="contained" onClick={handleUpload}>
        Save Changes
      </Button>

      <DeleteAccountButton id={id} setDialogOpen={setDialogOpen} />
    </div>
  );
};

export default EditUserForm;
