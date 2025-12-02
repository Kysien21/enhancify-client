import { X } from "lucide-react";

function ErrorPopup({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 md:pl-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto relative animate-fadeIn p-5">
        {/* Warning Icon */}
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <X size={32} className="text-yellow-600" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-yellow-800 mb-3 text-center">
          Warning
        </h2>

        {/* Message */}
        <p className="text-sm sm:text-md text-yellow-800 mb-6 text-center">
          {message}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-yellow-800 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorPopup;
