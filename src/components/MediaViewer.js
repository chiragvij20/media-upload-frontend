import { Box, Modal, IconButton, Typography } from "@mui/material";
import { Close, NavigateBefore, NavigateNext } from "@mui/icons-material";

const MediaViewer = ({ media, currentIndex, onClose, onNext, onPrevious }) => {
  const currentMedia = media[currentIndex];

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          outline: "none",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
        {currentMedia.fileUrl.endsWith(".mp4") ? (
          <video
            controls
            src={currentMedia.fileUrl}
            style={{ maxWidth: "80vw", maxHeight: "80vh" }}
          />
        ) : (
          <img
            src={currentMedia.fileUrl}
            alt="media"
            style={{ maxWidth: "80vw", maxHeight: "80vh" }}
          />
        )}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={onPrevious} disabled={currentIndex === 0}>
            <NavigateBefore />
          </IconButton>
          <Typography variant="body1">
            {currentIndex + 1} / {media.length}
          </Typography>
          <IconButton
            onClick={onNext}
            disabled={currentIndex === media.length - 1}
          >
            <NavigateNext />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default MediaViewer;