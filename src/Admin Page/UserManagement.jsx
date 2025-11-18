import { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "./Header and Sidebar/AdminHeader";
import AdminSidebar from "./Header and Sidebar/AdminSidebar";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_BASE}/admin/users`, {
        withCredentials: true
      });

      console.log('Users response:', response.data);

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
        `${API_BASE}/admin/users/${userId}/toggle-status`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        alert(response.data.message);
        fetchUsers(); // Refresh the list
      }
    } catch (err) {
      console.error("Error toggling user status:", err);
      alert(err.response?.data?.message || "Failed to update user status");
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone!")) return;

    try {
      const response = await axios.delete(
        `${API_BASE}/admin/users/${userId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        alert(response.data.message);
        fetchUsers(); // Refresh the list
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <main>
      <AdminHeader />
      <AdminSidebar />
      <section>
        <div className="fixed xl:w-[79%] xl:h-150 xl:top-25 xl:left-70 bg-[#EEF3FB] rounded-[20px] pt-15">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto mb-4"></div>
                <p className="text-lg text-[#1E3A8A]">Loading users...</p>
              </div>
            </div>
          ) : error ? (
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
          ) : (
            <div className="w-full max-w-6xl mx-auto bg-[#EEF3FB] rounded-lg overflow-hidden">
              <div className="mb-4 px-6">
                <h1 className="text-2xl font-semibold text-[#1E3A8A]">
                  User Management
                </h1>
                <p className="text-gray-600">Total Users: {users.length}</p>
              </div>

              <table className="w-full table-fixed">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm w-1/4">
                      Username
                    </th>
                    <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm w-1/4">
                      Email
                    </th>
                    <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm w-1/6">
                      Date Joined
                    </th>
                    <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm w-1/6">
                      Total Analysis
                    </th>
                    <th className="text-right px-6 py-4 text-blue-900 font-semibold text-sm w-1/6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr className="border-b border-gray-200">
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 pr-4 text-blue-900 text-sm">
                          {user.username}
                          {!user.isActive && (
                            <span className="ml-2 px-2 py-1 text-xs bg-red-200 text-red-800 rounded">
                              Blocked
                            </span>
                          )}
                        </td>
                        <td className="px-6 pr-4 text-blue-900 text-sm underline">
                          {user.email}
                        </td>
                        <td className="px-6 pr-4 text-blue-900 text-sm">
                          {formatDate(user.dateJoined)}
                        </td>
                        <td className="px-6 pl-15 text-blue-900 text-sm font-semibold">
                          {user.totalAnalysis}
                        </td>
                        <td className="px-6 pr-4 flex items-center gap-2 p-2 flex-col pl-30">
                          <button
                            onClick={() => handleBlock(user._id)}
                            className={`${
                              user.isActive
                                ? "bg-cyan-300 hover:bg-cyan-400"
                                : "bg-green-300 hover:bg-green-400"
                            } text-[#1e3a5f] px-5 py-1 rounded text-[10px] font-medium transition-colors`}
                          >
                            {user.isActive ? "Block" : "Unblock"}
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-400 text-white px-5 py-1 rounded text-[10px] font-medium hover:bg-red-500 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default UserManagement;