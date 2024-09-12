import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getResetPasswordMail } from "../store/methods/authMethod";

function Home() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getResetPasswordMail(userData.email));
  };

  return (
    <>
      {userData?.userId ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              User Information
            </h2>
            <div className="mb-4 flex items-center">
              <label htmlFor="id" className="text-gray-600 font-semibold w-1/3">
                ID # :
              </label>
              <h1 className="text-lg text-gray-900">{userData?.userId}</h1>
            </div>
            <div className="mb-4 flex items-center">
              <label
                htmlFor="username"
                className="text-gray-600 font-semibold w-1/3"
              >
                Username :
              </label>
              <h1 className="text-lg text-gray-900">{userData?.username}</h1>
            </div>
            <div className="mb-4 flex items-center">
              <label
                htmlFor="email"
                className="text-gray-600 font-semibold w-1/3"
              >
                Email :
              </label>
              <h1 className="text-lg text-gray-900">{userData?.email}</h1>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSubmit}
            >
              Change Password
            </button>
          </div>
        </div>
      ) : (
        <div>Please login first</div>
      )}
    </>
  );
}

export default Home;
