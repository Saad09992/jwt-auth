import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/methods/authMethod";
import { useNavigate } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error, msg } = useSelector((state) => state.auth);

  const [redirect, setRedirect] = useState(false);

  const signupFormik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await dispatch(registerUser(values)).unwrap();
        if (response.success) {
          setRedirect(true);
          console.log("redirect set to true");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (redirect) {
      navigate("/login");
    }
  }, [redirect, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        <form onSubmit={signupFormik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              value={signupFormik.values.username}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
            />
            {signupFormik.touched.username && signupFormik.errors.username ? (
              <div className="text-red-500 text-sm mt-1">
                {signupFormik.errors.username}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              value={signupFormik.values.email}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
            />
            {signupFormik.touched.email && signupFormik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {signupFormik.errors.email}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              value={signupFormik.values.password}
              onChange={signupFormik.handleChange}
              onBlur={signupFormik.handleBlur}
            />
            {signupFormik.touched.password && signupFormik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">
                {signupFormik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
