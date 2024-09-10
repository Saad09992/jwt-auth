import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUser } from "../store/methods/authMethod";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(loginUser(values)).unwrap();
        const token = resultAction.token;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem(
            "token-expiry",
            new Date().getTime() + 60 * 60 * 1000
          );
          navigate("/");
        } else {
          console.error("Token not found in the result");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    loginFormik.setValues({
      ...loginFormik.values,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={loginFormik.handleSubmit} className="space-y-6">
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
              value={loginFormik.values.email}
              onChange={handleChange}
              onBlur={loginFormik.handleBlur}
            />
            {loginFormik.touched.email && loginFormik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {loginFormik.errors.email}
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
              value={loginFormik.values.password}
              onChange={handleChange}
              onBlur={loginFormik.handleBlur}
            />
            {loginFormik.touched.password && loginFormik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">
                {loginFormik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
