import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import MediaViewer from "./MediaViewer";

const MediaList = () => {
  const [media, setMedia] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchMedia = async () => {
    const token = localStorage.getItem("token");
    try {
      // Update the API endpoint to match your Render backend URL
      const { data } = await axios.get(
        "https://media-upload-backend.onrender.com/api/media",
        {
          headers: { Authorization: token },
        }
      );
      setMedia(data);
    } catch (err) {
      console.error("Failed to fetch media:", err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleMediaClick = (index) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < media.length - 1 ? prev + 1 : prev));
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {media.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{ p: 2, borderRadius: 2 }}
              onClick={() => handleMediaClick(index)}
            >
              {item.fileUrl.endsWith(".mp4") ? (
                <video controls width="100%" src={item.fileUrl} />
              ) : (
                <img
                  src={item.fileUrl}
                  alt="media"
                  style={{ width: "100%", borderRadius: 8 }}
                />
              )}
            </Paper>
          </motion.div>
        </Grid>
      ))}
      {selectedIndex !== null && (
        <MediaViewer
          media={media}
          currentIndex={selectedIndex}
          onClose={handleClose}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </Grid>
  );
};

export default MediaList;
