import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserData } from "../store/methods/authMethod";

function RootLayout({ children }) {
  const dispatch = useDispatch();
  const { msg, error } = useSelector((state) => state.auth);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("token-expiry");

    if (token && expiry && new Date().getTime() < expiry) {
      console.log("Token valid");
      dispatch(getUserData(token));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("token-expiry");
      console.log("token invalid");
    }
  }, []);

  useEffect(() => {
    if (msg) {
      toast.success(msg);
    }
  }, [msg]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}

export default RootLayout;
