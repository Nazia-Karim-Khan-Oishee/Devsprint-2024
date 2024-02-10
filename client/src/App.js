import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index.js";
import LoginPage from "./pages/Login/index.js";
import SignupPage from "./pages/Signup/index.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
