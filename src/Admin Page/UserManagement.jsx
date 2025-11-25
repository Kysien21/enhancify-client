import { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "./Header and Sidebar/AdminHeader";
import AdminSidebar from "./Header and Sidebar/AdminSidebar";
import DeleteButton from "./Component/DeleteButton";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${API_BASE}/api/v1/admin/users`, 
        {
          withCredentials: true,
        }      );

      if (response.data.success) {
        setUsers(response.data.data);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.response?.data?.message || "Failed to load users");
      setLoading(false);
    }
  };

  const handleBlock = async (userId) => {
    if (!confirm("Are you sure you want to block/unblock this user?")) return;

    try {
      const response = await axios.patch(
       `${API_BASE}/api/v1/admin/users/${userId}/toggle-status`,
      {},
      { withCredentials: true }
      );

      if (response.data.success) {
        alert(response.data.message);
        fetchUsers();
      }
    } catch (err) {
      console.error("Error toggling user status:", err);
      alert(err.response?.data?.message || "Failed to update user status");
    }
  };

  const handleDelete = async (userId) => {
  try {
    const response = await axios.delete(
      `${API_BASE}/api/v1/admin/users/${userId}`,
      { withCredentials: true }
    );

    if (response.data.success) {
      alert(response.data.message);
      fetchUsers();
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    alert(err.response?.data?.message || "Failed to delete user");
  }
};


  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <main>
      <AdminHeader />
      <AdminSidebar />
      <section>
        <div className="pt-16 sm:pt-20 xl:pt-24 md:ml-[16%] xl:ml-[15%] 2xl:ml-[16%] min-h-screen">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Loading UI */}
            {loading && (
              <div className="flex items-center justify-center h-150">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto mb-4"></div>
                  <p className="text-lg text-[#1E3A8A]">Loading dashboard...</p>
                </div>
              </div>
            )}

            {/* Error UI */}
            {error && !loading && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-red-500 text-6xl mb-4">⚠️</div>
                  <h2 className="text-2xl text-red-600 mb-2">Error Loading Users</h2>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button
                    onClick={fetchUsers}
                    className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded-lg transition duration-200"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* MAIN UI */}
            {!loading && !error && (
              <>
                {/* DESKTOP TABLE */}
                <div className="hidden lg:block bg-[#EEF3FB] rounded-lg overflow-hidden max-h-[calc(103vh-150px)] overflow-y-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-300">
                        <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm">
                          Username
                        </th>
                        <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm">
                          Email
                        </th>
                        <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm">
                          Date Joined
                        </th>
                        <th className="text-center px-6 py-4 text-blue-900 font-semibold text-sm">
                          Total Analysis
                        </th>
                        <th className="text-center px-6 py-4 text-blue-900 font-semibold text-sm">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-6 text-gray-500">
                            No users found
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr
                            key={user._id}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 text-blue-900 text-sm font-medium">
                              {user.username}
                              {!user.isActive && (
                                <span className="ml-2 px-2 py-1 text-xs bg-red-200 text-red-800 rounded">
                                  Blocked
                                </span>
                              )}
                            </td>

                            <td className="px-6 py-4 text-blue-900 text-sm underline">
                              {user.email}
                            </td>

                            <td className="px-6 py-4 text-blue-900 text-sm">
                              {formatDate(user.dateJoined)}
                            </td>

                            <td className="px-6 py-4 text-center text-blue-900 text-sm font-semibold">
                              {user.totalAnalysis}
                            </td>

                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center flex-col gap-2">
                                <button
                                  onClick={() => handleBlock(user._id)}
                                  className={`${
                                    user.isActive
                                      ? "bg-cyan-300 hover:bg-cyan-400"
                                      : "bg-green-300 hover:bg-green-400"
                                  } text-[#1e3a5f] px-5 py-1 rounded text-xs font-medium`}
                                >
                                  {user.isActive ? "Block" : "Unblock"}
                                </button>

                                <DeleteButton onDelete={() => handleDelete(user._id)} />

                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE CARD VIEW */}
                <div className="lg:hidden space-y-4">
                  {users.length === 0 ? (
                    <p className="text-center text-gray-500">No users found</p>
                  ) : (
                    users.map((user) => (
                      <div
                        key={user._id}
                        className="bg-[#EEF3FB] rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-blue-900 font-semibold">
                              {user.username}
                            </h3>
                            <p className="text-blue-900 underline break-all">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600 font-medium">Date Joined:</span>
                            <p className="text-blue-900 mt-1">
                              {formatDate(user.dateJoined)}
                            </p>
                          </div>

                          <div>
                            <span className="text-gray-600 font-medium">Total Analysis:</span>
                            <p className="text-blue-900 font-semibold mt-1">
                              {user.totalAnalysis}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-3 border-t border-gray-300">
                          <button
                            onClick={() => handleBlock(user._id)}
                            className={`flex-1 px-4 py-2 rounded text-sm font-medium text-white ${
                              user.isActive
                                ? "bg-cyan-500 hover:bg-cyan-600"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            {user.isActive ? "Block" : "Unblock"}
                          </button>

<DeleteButton onDelete={() => handleDelete(user._id)} />

                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

          </div>
        </div>
      </section>
    </main>
  );
}

export default UserManagement;