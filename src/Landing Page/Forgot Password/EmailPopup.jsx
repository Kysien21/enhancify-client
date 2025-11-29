import { useState } from "react";

function EmailPopup({ onEmailValid }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Mock database for testing
  const mockDatabase = ["test@gmail.com", "user@example.com", "admin@example.com"];

  // Function to handle sending email
  const handleSend = () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    // Mock "API call" to check if email exists
    const emailExists = mockDatabase.includes(email);

    if (emailExists) {
      setError("");
      onEmailValid(email); // Call parent function to show NewPassword
    } else {
      setError("Email not found in database!");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center pt-20 z-15 bg-[#2979FF]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto relative animate-fadeIn">
        <div className="p-6 sm:p-15">
          <h2 className="text-2xl font-semibold text-blue-900 mb-3">Forgot Password</h2>
          <p className="text-sm sm:text-md text-blue-900 mb-6 sm:mb-8">
            Enter your email address below, and we'll send you a link to reset your password.
          </p>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-2">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <button
            onClick={handleSend}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailPopup;
