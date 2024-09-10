import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/methods/adminMethod";

function Users() {
  const { userId, isAdmin } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUsers(userId));
    }
  }, [userId, dispatch]);

  if (!isAdmin) {
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
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
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
