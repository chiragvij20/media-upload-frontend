import React from "react";
import { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import MediaUpload from "./components/MediaUpload";
import MediaList from "./components/MediaList";
import Avatar from "@mui/material/Avatar";

const Dashboard = ({ user, setUser }) => {
  const [refreshMedia, setRefreshMedia] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            borderBottom: "2px solid",
            borderColor: "divider",
            pb: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar src={user.picture} sx={{ width: 48, height: 48 }} />
            Welcome, {user.name}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: 2,
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 4,
              },
            }}
          >
            Logout
          </Button>
        </Box>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <MediaUpload onUploadSuccess={() => setRefreshMedia(!refreshMedia)} />
        </motion.div>

        {/* Media Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <MediaList key={refreshMedia} />
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default Dashboard;
