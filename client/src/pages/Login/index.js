import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

import "./index.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, isLoading } = useLogin();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Form onSubmit={handleSubmit} className="w-100">
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
          <Button
            variant="primary"
            type="submit"
            className="mb-3"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Login
          </Button>
          {error && <div className="error">{error}</div>}
        </Form>
        <Link to="/signup">
          <Button variant="link">Don't have an account? Signup here</Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
