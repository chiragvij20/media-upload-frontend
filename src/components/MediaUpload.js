import React, { useRef, useState } from "react";
import axios from "axios";
import { Button, Box, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { Send } from "@mui/icons-material";
import { motion } from "framer-motion";
import Paper from "@mui/material/Paper";

const MediaUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");
    try {
    await axios.post(
        "https://media-upload-backend.onrender.com/api/media/upload",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File uploaded successfully!");
      setFile(null);
      setPreview(null);
      fileInputRef.current.value = "";
      onUploadSuccess();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    }
  };
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 1,
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          mb: preview ? 2 : 0,
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUpload />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            Choose File
          </Button>
        </label>

        {file && (
          <Button
            variant="contained"
            color="success"
            onClick={handleUpload}
            startIcon={<Send />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Upload Now
          </Button>
        )}
      </Box>

      {preview && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: "rgba(33, 150, 243, 0.05)",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Preview:
            </Typography>
            {file.type.startsWith("image/") ? (
              <img
                src={preview}
                alt="preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: 8,
                  boxShadow: 3,
                }}
              />
            ) : (
              <video
                controls
                src={preview}
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: 8,
                  boxShadow: 3,
                }}
              />
            )}
          </Paper>
        </motion.div>
      )}
    </Box>
  );
};

export default MediaUpload;
