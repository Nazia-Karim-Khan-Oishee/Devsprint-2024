import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index.js";
import LoginPage from "./pages/Login/index.js";
import SignupPage from "./pages/Signup/index.js";
import ProjectManagementPage from "./pages/ProjectManagement/index.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/project-management" element={<ProjectManagementPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
