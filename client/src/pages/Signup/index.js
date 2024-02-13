import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

import "./index.css";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signup, error, loading } = useSignup();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      await signup(username, email, password);
    }
  };
  useEffect(() => {
    if (password === confirmPassword && confirmPassword !== "") {
      setPasswordMatchError("Passwords Match!");
    } else {
      setPasswordMatchError("Passwords do not match.");
    }
  }, [confirmPassword]);
  useEffect(() => {
    setPasswordMatchError("");
  }, []);
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
              onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="current-password" // Enable autocomplete for password
              />
              <div>
                {passwordMatchError && (
                  <p className="text-red-500">{passwordMatchError}</p>
                )}
              </div>

              <Button variant="outline-dark" onClick={handleTogglePassword}>
                {showPassword ? "🙈" : "👁️"}
              </Button>
            </InputGroup>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mb-3"
            onClick={handleSubmit}
            disabled={loading}
          >
            Signup
          </Button>
        </Form>
        <Link to="/login">
          <Button variant="link">Already have an account? Login here</Button>
        </Link>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default SignupPage;
