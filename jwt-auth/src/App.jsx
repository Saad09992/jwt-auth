import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/Rootlayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/users" element={<Users />} /> */}
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;
