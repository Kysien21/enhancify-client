import { Check } from "lucide-react";

function SuccessPopup({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-5">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto relative animate-fadeIn p-7">
        
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-600" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-green-600 mb-3 text-center">
          Signup Successful!
        </h2>

        {/* Message */}
        <p className="text-md text-blue-900 mb-6 text-center">
          Your account has been created successfully.
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default SuccessPopup;
