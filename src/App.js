import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Container, Typography, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import "./App.css";
import axios from "axios";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async (credentialResponse) => {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/auth/google",
        {
          token: credentialResponse.credential,
        }
      );
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <GoogleOAuthProvider clientId="195028132072-mj5bmfgd9r3qd9frg5dlinfqbu8t4h30.apps.googleusercontent.com">
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        {!user ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 4,
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: "-50%",
                  right: "-50%",
                  width: "200%",
                  height: "200%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                  transform: "rotate(30deg)",
                },
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  background:
                    "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                Welcome !!
              </Typography>

              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  textAlign: "center",
                  py: 4,
                }}
              >
                <GoogleLogin
                  onSuccess={handleLogin}
                  onError={() => console.log("Login Failed")}
                  shape="pill"
                  size="large"
                  theme="filled_blue"
                  width="300"
                />
              </Box>
            </Paper>
          </motion.div>
        ) : (
          <Dashboard user={user} setUser={setUser} />
        )}
      </Container>
    </GoogleOAuthProvider>
  );
}

export default App;