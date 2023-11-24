import { Typography } from "@mui/material";
import React from "react";
import MarkdownBlock from "./MarkdownBlock";

const MarkdownPreview = ({ content }) => {
  return (
    <div>
      {content && (
        <div className="preview-container">
          <Typography variant="h5" sx={{ mt: "15px", mb: "5px" }}>
            Preview:
          </Typography>
          <MarkdownBlock content={content} />
        </div>
      )}
    </div>
  );
};

export default MarkdownPreview;
