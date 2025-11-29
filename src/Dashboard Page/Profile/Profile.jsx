
import { X } from 'lucide-react';
import Sidebar from './Sidebar';

export default function ProfileEditForm() {

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-8 md:p-13 relative">
          {/* Close Button */}
          <button className="absolute top-2 right-2 text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 p-1 rounded-full transition">
            <X size={21} strokeWidth={2.5} />
          </button>

          {/* Form Fields */}
          <div className="space-y-5 max-w-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="text-gray-700 font-medium min-w-[100px]">First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="text-gray-700 font-medium min-w-[100px]">Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="text-gray-700 font-medium min-w-[100px]">Number</label>
              <input
                type="text"
                name="number"
                onChange={handleChange}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="text-gray-700 font-medium min-w-[100px]">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="text-gray-700 font-medium min-w-[100px]">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Action Buttons */}
            <div className="sm:flex-row pt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 px-8 py-1 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition font-medium shadow-md text-md"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}