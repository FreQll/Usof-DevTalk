import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomDialog from "../Dialog/CustomDialog";
import CategoriesSelector from "./CategoriesSelector";
import "./PostForm.css";
import MarkdownPreview from "../MarkdownPreview";
import { useNavigate } from "react-router-dom";

const PostForm = ({
  formData,
  onFormChange,
  onSubmit,
  setPostFormState,
  isEdit,
}) => {
  const { content, title, category, status, error } = formData || {};
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const discardDraft = () => {
    setOpen(false);
    setPostFormState({
      content: "",
      title: "",
      category: [],
      error: "",
    });
  };

  const discardChanges = () => {
    navigate(0);
  };

  return (
    <form className="create-post-form" onSubmit={onSubmit}>
      <div className="form-title-part">
        <Typography variant="body1">Title</Typography>
        <Typography variant="body2" sx={{ color: "grey" }}>
          Be specific and imagine you're asking a question to another person.
        </Typography>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => onFormChange("title", e.target.value)}
          variant="outlined"
          required
          fullWidth
        />
      </div>

      <div className="form-content-part">
        <Typography variant="body1">
          What are the details of your problem?
        </Typography>
        <Typography variant="body2" sx={{ color: "grey" }}>
          Introduce the problem and expand on what you put in the title.
          Markdown is supported. Minimum 20 characters.
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          multiline
          rows={10}
          variant="filled"
          value={content}
          onChange={(e) => onFormChange("content", e.target.value)}
          required
          fullWidth
        />
      </div>

      {!isEdit ? (
        <div className="form-content-part">
          <Typography variant="body1">Category</Typography>
          <Typography variant="body2" sx={{ color: "grey" }}>
            Pick one or few categories that best describes your question.
            Remember, you can't change categories later
          </Typography>
          <CategoriesSelector
            category={category}
            handleChange={(value) => onFormChange("category", value)}
          />
        </div>
      ) : (
        <div className="form-content-part">
          <Typography variant="body1">Post Status</Typography>
          <Typography variant="body2" sx={{ color: "grey" }}>
            You can change status of post. Inactive posts will be shown only for
            you and admins!
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => onFormChange("status", e.target.value)}
            >
              <MenuItem value={"active"}>Active</MenuItem>
              <MenuItem value={"inactive"}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}

      <MarkdownPreview content={content} />

      <div className="post-form-buttons">
        <Button variant="contained" type="sumbit">
          {!isEdit ? "Post Your Question" : "Save Changes"}
        </Button>
        {(content.length > 100 || title) && (
          <Button variant="text" onClick={handleClickOpen}>
            Discard
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        setOpen={setOpen}
        agreeAction={!isEdit ? discardDraft : discardChanges}
        dialogTitle={"Discard Draft?"}
        dialogContent={"Are you sure you want to discard your draft?"}
      />
    </form>
  );
};

export default PostForm;
