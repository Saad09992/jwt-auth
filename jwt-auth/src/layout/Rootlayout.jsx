import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function RootLayout({ children }) {
  const { msg, error } = useSelector((state) => state.auth);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("token-expiry");

    if (token && expiry && new Date().getTime() < expiry) {
      console.log("Token valid");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("token-expiry");
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
