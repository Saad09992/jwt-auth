import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delUser, getUsers, setUserRole } from "../store/methods/adminMethod";
import { ToastContainer, toast } from "react-toastify";
import { resetMsgAndSuccess } from "../store/slices/authSlice";
import { resetMsgAndSuccessAdmin } from "../store/slices/adminSlice";
function Users() {
  const { userData } = useSelector((state) => state.auth);
  const { users = [], success, msg } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const handleDel = (userId) => {
    dispatch(delUser(userId));
  };

  const handleRole = (userId) => {
    dispatch(setUserRole(userId));
  };

  useEffect(() => {
    if (userData.userId) {
      dispatch(getUsers(userData.userId));
    }
  }, [userData.userId, dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(getUsers(userData.userId));
    }
  }, [userData.userId, dispatch, success]);

  useEffect(() => {
    if (msg) {
      toast.success(msg);
      dispatch(resetMsgAndSuccessAdmin());
    }
  }, [msg]);

  if (!userData.isAdmin) {
    return (
      <div className="p-4 bg-red-100 text-red-800 border border-red-400 rounded">
        You are not an admin
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      {users.length === 0 ? (
        <p className="text-lg text-gray-600">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Id#
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.isVerified ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.isAdmin ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-row gap-2">
                      <button
                        className="bg-green-400 p-2 rounded-lg text-white text-base hover:bg-g  reen-500 "
                        onClick={() => {
                          handleRole(user._id);
                        }}
                      >
                        Change Role
                      </button>
                      <button
                        className="bg-red-400 p-2 rounded-lg text-white text-base hover:bg-red-500 "
                        onClick={() => {
                          handleDel(user._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
[];
