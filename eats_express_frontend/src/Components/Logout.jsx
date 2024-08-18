import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("userid");
    if (localStorage.getItem("userid") === null) {
      navigate("/");
    }
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
