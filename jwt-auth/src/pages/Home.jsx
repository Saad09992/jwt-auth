import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const { userData } = useSelector((state) => state.auth);

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
          </div>
        </div>
      ) : (
        <div>Please login first</div>
      )}
    </>
  );
}

export default Home;
