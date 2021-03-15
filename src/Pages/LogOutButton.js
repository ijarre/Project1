import React, { useContext } from "react";
import { Button } from "antd";
import { UserContext } from "../context/UserContext";

const LogOutButton = () => {
  const [user, setUser] = useContext(UserContext);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return <a onClick={handleLogout}>Log Out</a>;
};

export default LogOutButton;
