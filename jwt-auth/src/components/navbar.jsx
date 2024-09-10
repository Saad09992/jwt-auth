// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice"; // Import the logout action

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-400">
            Home
          </Link>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/login" className="text-white hover:text-gray-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-white hover:text-gray-400">
                Signup
              </Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>
              <Link to="/users" className="text-white hover:text-gray-400">
                Users
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-400"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
