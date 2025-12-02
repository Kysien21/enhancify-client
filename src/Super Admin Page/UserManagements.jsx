import { useState, useEffect } from "react";
import axios from "axios";
import SuperAdminHeader from "./Header and Sidebar/SuperAdminHeader";
import SuperAdminSidebar from "./Header and Sidebar/SuperAdminSidebar";
import DeletePopup from "./Components/DeletePopup";
import SuccessPopup from "./Components/SucessPopup";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchUsers(); // always fetch fresh data on mount
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/v1/admin/users`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUserId) return;

    try {
      const response = await axios.delete(
        `${API_BASE}/api/v1/admin/users/${selectedUserId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        const updatedUsers = users.filter((user) => user._id !== selectedUserId);
        setUsers(updatedUsers);

        setShowDeletePopup(false);
        setShowSuccessPopup(true);
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  const handleCancelDelete = () => {
    setSelectedUserId(null);
    setShowDeletePopup(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccessPopup(false);
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

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <SuperAdminHeader />
      <SuperAdminSidebar />

      <section>
        <div className="pt-16 sm:pt-20 xl:pt-24 md:ml-[16%] xl:ml-[15%] 2xl:ml-[16%] min-h-screen">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* SEARCH BAR */}
            <div className="mb-5 w-full flex justify-end">
              <input
                type="text"
                placeholder="Search by username or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden lg:block bg-[#EEF3FB] rounded-lg overflow-hidden max-h-[calc(100vh-150px)] overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm">Full Name</th>
                    <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm">Email</th>
                    <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm">Date Joined</th>
                    <th className="text-center px-6 py-4 text-blue-900 font-semibold text-sm">Total Analysis</th>
                    <th className="text-center px-6 py-4 text-blue-900 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-gray-500">No users found</td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 text-blue-900 text-sm font-medium">{user.username}</td>
                        <td className="px-6 py-5 text-blue-900 text-sm underline">{user.email}</td>
                        <td className="px-6 py-5 text-blue-900 text-sm">{formatDate(user.dateJoined)}</td>
                        <td className="px-6 py-5 text-center text-blue-900 text-sm font-semibold">{user.totalAnalysis}</td>
                        <td className="px-6 py-5 flex justify-center">
                          <button
                            onClick={() => handleDeleteClick(user._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
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

            {/* MOBILE CARD VIEW */}
            <div className="lg:hidden space-y-4">
              {filteredUsers.length === 0 ? (
                <p className="text-center text-gray-500">No users found</p>
              ) : (
                filteredUsers.map((user) => (
                  <div key={user._id} className="bg-[#EEF3FB] rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-blue-900 font-semibold">{user.username}</h3>
                        <p className="text-blue-900 underline break-all">{user.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5 text-sm">
                      <div>
                        <span className="text-gray-600 font-medium">Date Joined:</span>
                        <p className="text-blue-900 mt-1">{formatDate(user.dateJoined)}</p>
                      </div>

                      <div>
                        <span className="text-gray-600 font-medium">Total Analysis:</span>
                        <p className="text-blue-900 font-semibold mt-1">{user.totalAnalysis}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-300">
                      <button
                        onClick={() => handleDeleteClick(user._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Delete confirmation popup */}
            {showDeletePopup && (
              <DeletePopup
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}

            {/* Success popup */}
            {showSuccessPopup && <SuccessPopup onClose={handleCloseSuccess} />}

          </div>
        </div>
      </section>
    </main>
  );
}

export default UserManagement;
