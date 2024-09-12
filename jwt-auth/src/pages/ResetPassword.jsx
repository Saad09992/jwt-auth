import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../store/methods/authMethod";
import { ToastContainer, toast } from "react-toastify";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetPasswordToken, success } = useSelector((state) => state.auth);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      dispatch(resetPassword({ newPassword, resetPasswordToken }));
    } else {
      toast.error("Passwords do not match");
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [resetPasswordToken, dispatch, success]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <ToastContainer />
      <div className="w-full max-w-md p-8 bg-blue-50 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-blue-800 mb-6">
          Change Password
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-blue-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-blue-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
