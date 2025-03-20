import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Paper, Button, Checkbox } from "@mui/material";
import { motion } from "framer-motion";
import MediaViewer from "./MediaViewer";

const MediaList = () => {
  const [media, setMedia] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedMediaIds, setSelectedMediaIds] = useState([]);

  const fetchMedia = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/api/media",
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

  const handleSelectMedia = (mediaId) => {
    if (selectedMediaIds.includes(mediaId)) {
      setSelectedMediaIds(selectedMediaIds.filter((id) => id !== mediaId));
    } else {
      setSelectedMediaIds([...selectedMediaIds, mediaId]);
    }
  };

  const handleDeleteMedia = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        process.env.REACT_APP_BACKEND_URL + "/api/media/delete",
        {
          headers: { Authorization: token },
          data: { mediaIds: selectedMediaIds },
        }
      );
      setSelectedMediaIds([]); // Clear selected media IDs
      fetchMedia(); // Refresh the media list
    } catch (err) {
      console.error("Failed to delete media:", err);
    }
  };

  return (
    <div>
      {selectedMediaIds.length > 0 && (
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteMedia}
          sx={{ mb: 2 }}
        >
          Delete Selected ({selectedMediaIds.length})
        </Button>
      )}

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
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: selectedMediaIds.includes(item.id)
                    ? "2px solid #ff4081"
                    : "none",
                  position: "relative",
                }}
              >
                {/* Checkbox for selection */}
                <Checkbox
                  checked={selectedMediaIds.includes(item.id)}
                  onChange={() => handleSelectMedia(item.id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                />

                {/* Media preview */}
                <div
                  onClick={() => handleMediaClick(index)}
                  style={{ cursor: "pointer" }}
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
                </div>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {selectedIndex !== null && (
        <MediaViewer
          media={media}
          currentIndex={selectedIndex}
          onClose={handleClose}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
};

export default MediaList;