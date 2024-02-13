import React from "react";
import Button from "react-bootstrap/Button";
import { useLogout } from "../../hooks/useLogout";

const HomePage = () => {
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This is the content of the home page.</p>
      <Button onClick={handleLogout}>LOGOUT</Button>
    </div>
  );
};

export default HomePage;
