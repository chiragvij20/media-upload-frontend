import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = ({ setUser }) => {
  const handleLogin = async (credentialResponse) => {
    try {
      const { data } = await axios.post(
        "https://media-upload-backend.onrender.com/api/auth/google",
        {
          token: credentialResponse.credential,
        }
      );
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="195028132072-mj5bmfgd9r3qd9frg5dlinfqbu8t4h30.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => console.log("Login Failed")}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
