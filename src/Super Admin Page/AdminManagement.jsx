import { useState, useEffect } from "react";
import axios from "axios";
import SuperAdminHeader from "./Header and Sidebar/SuperAdminHeader";
import SuperAdminSidebar from "./Header and Sidebar/SuperAdminSidebar";
import DeleteButton from "./Components/DeleteButton";
import AddAdmin from "./Components/AddAdmin";

function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const cachedAdmins = sessionStorage.getItem("admins");
    if (cachedAdmins) {
      setAdmins(JSON.parse(cachedAdmins));
    } else {
      fetchAdmins();
    }
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/v1/admin/admins`, { withCredentials: true });
      if (response.data.success) {
        setAdmins(response.data.data);
        sessionStorage.setItem("admins", JSON.stringify(response.data.data));
      }
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  const handleDelete = async (adminId) => {
    try {
      const response = await axios.delete(`${API_BASE}/api/v1/admin/admins/${adminId}`, { withCredentials: true });
      if (response.data.success) {
        alert(response.data.message);
        const updatedAdmins = admins.filter((admin) => admin._id !== adminId);
        setAdmins(updatedAdmins);
        sessionStorage.setItem("admins", JSON.stringify(updatedAdmins));
      }
    } catch (err) {
      console.error("Error deleting admin:", err);
      alert(err.response?.data?.message || "Failed to delete admin");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
  };

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <SuperAdminHeader />
      <SuperAdminSidebar />

      <section>
        <div className="pt-16 sm:pt-20 xl:pt-24 md:ml-[16%] xl:ml-[15%] 2xl:ml-[16%] min-h-screen">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Search and Add Button */}
            <div className="mb-5 w-full flex justify-end gap-5">
              <button
                onClick={() => setShowModal(true)}
                className="w-full h-10 sm:w-50 text-xs sm:text-md font-semibold text-white bg-blue-900 hover:bg-blue-800 active:scale-95 cursor-pointer rounded-lg transition"
              >
                Add New Admin
              </button>
              <input
                type="text"
                placeholder="Search by username or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-[#EEF3FB] rounded-lg overflow-hidden max-h-[calc(100vh-150px)] overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm">Username</th>
                    <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm">Department</th>
                    <th className="text-left px-6 py-4 text-blue-900 font-semibold text-sm">Resume Upload</th>
                    <th className="text-center px-6 py-4 text-blue-900 font-semibold text-sm">Average Score</th>
                    <th className="text-center px-6 py-4 text-blue-900 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-gray-500">No admins found</td>
                    </tr>
                  ) : (
                    filteredAdmins.map((admin) => (
                      <tr key={admin._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 text-blue-900 text-sm font-medium">{admin.username}</td>
                        <td className="px-6 py-5 text-blue-900 text-sm underline">{admin.email}</td>
                        <td className="px-6 py-5 text-blue-900 text-sm">{formatDate(admin.dateJoined)}</td>
                        <td className="px-6 py-5 text-center text-blue-900 text-sm font-semibold">{admin.averageScore}</td>
                        <td className="px-6 py-5 flex justify-center">
                          <DeleteButton onDelete={() => handleDelete(admin._id)} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {filteredAdmins.length === 0 ? (
                <p className="text-center text-gray-500">No admins found</p>
              ) : (
                filteredAdmins.map((admin) => (
                  <div key={admin._id} className="bg-[#EEF3FB] rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-blue-900 font-semibold">{admin.username}</h3>
                        <p className="text-blue-900 underline break-all">{admin.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600 font-medium">Date Joined:</span>
                        <p className="text-blue-900 mt-1">{formatDate(admin.dateJoined)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 font-medium">Average Score:</span>
                        <p className="text-blue-900 font-semibold mt-1">{admin.averageScore}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-300">
                      <DeleteButton onDelete={() => handleDelete(admin._id)} />
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center ">
    <AddAdmin handleModalClose={() => setShowModal(false)} />
  </div>
)}


    </main>
  );
}

export default AdminManagement;
