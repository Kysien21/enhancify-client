import { X } from 'lucide-react';
import { Link } from "react-router-dom";

function Profile({ handleClose }) {
  // Example data; replace with actual user data
  const fullName = "John Doe";
  const department = "CIT - College of Information Technology";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 p-4 pl-60">
      <div className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-lg relative">

        {/* Sidebar */}
        <aside className="w-56 bg-[#3b7ce9] rounded-l-2xl">
          <div className="flex flex-col h-full py-10 px-6">
            <h2 className="text-white text-2xl font-semibold mb-8">Profile Menu</h2>
            <nav>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    to="/pro"
                    className="block text-white text-lg font-medium hover:opacity-80 transition"
                  >
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="block text-white text-lg font-medium hover:opacity-80 transition"
                  >
                    Delete Account
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6 sm:p-10 relative">
          {/* Close Button (no longer closes modal) */}
<button
  type="button"
  onClick={handleClose} // this will now close the modal
  className="absolute top-4 right-4 text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 p-1 rounded-full transition cursor-pointer"
>
  <X size={21} strokeWidth={2.5} />
</button>


          {/* Full Name & Department */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">{fullName}</h1>
            <p className="text-gray-500">{department}</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {["First Name", "Last Name", "Number", "Email", "Password"].map((label, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="text-gray-700 font-medium min-w-[100px]">{label}</label>
                <input
                  type={label === "Password" ? "password" : label === "Email" ? "email" : "text"}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full"
                />
              </div>
            ))}

            {/* Action Button */}
            <div className="pt-6">
              <button className="w-full px-8 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition font-medium shadow-md text-md">
                Update Profile
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
