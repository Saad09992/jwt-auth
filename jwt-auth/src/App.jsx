import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/Rootlayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Verify from "./pages/Verify";
import ResetPassword from "./pages/ResetPassword";
import Email from "./components/Email";

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<Users />} />
          <Route path="/verify/:token" element={<Verify />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/email" element={<Email />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;
