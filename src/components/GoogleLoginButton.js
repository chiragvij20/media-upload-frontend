import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = ({ setUser }) => {
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
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId=`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`>
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => console.log("Login Failed")}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;