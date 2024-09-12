import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../store/methods/authMethod";

function Verify() {
  const navigate = useNavigate();
  const { emailVerificationToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { success, msg, error } = useSelector((state) => state.auth);

  const verify = async (token) => {
    console.log(token);
    try {
      await dispatch(verifyToken(token));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Verify Your Email</h2>
      <p className="mb-4">Click the button below to verify your email.</p>
      <button
        onClick={() => verify(emailVerificationToken)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Verify
      </button>
      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}

export default Verify;
