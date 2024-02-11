import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";

import "./index.css";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <Form onSubmit={handleSubmit} className="w-100">
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter username"
              onChange={handleUsernameChange}
              autoComplete="name"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleUsernameChange}
              autoComplete="email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handlePasswordChange}
                autoComplete="current-password" // Enable autocomplete for password
              />

              <Button variant="outline-dark" onClick={handleTogglePassword}>
                {showPassword ? "🙈" : "👁️"}
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handlePasswordChange}
                autoComplete="current-password" // Enable autocomplete for password
              />

              <Button variant="outline-dark" onClick={handleTogglePassword}>
                {showPassword ? "🙈" : "👁️"}
              </Button>
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-3">
            Signup
          </Button>
        </Form>
        <Link to="/login">
          <Button variant="link">Already have an account? Login here</Button>
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
