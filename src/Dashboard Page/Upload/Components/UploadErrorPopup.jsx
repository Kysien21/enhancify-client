import { AlertTriangle } from "lucide-react";

function UploadErrorPopup({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-5 md:pl-[17%] mt-15">
      <div className="bg-white rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.1),0_-4px_8px_rgba(0,0,0,0.05),4px_0_8px_rgba(0,0,0,0.05),-4px_0_8px_rgba(0,0,0,0.05)] w-full max-w-sm mx-auto relative animate-fadeIn p-10">
        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-red-500 mb-3 text-center">
          Warning
        </h2>

        {/* Message */}
        <p className="text-md text-red-500 mb-6 text-center">
          {message}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-red-700 text-white py-3 rounded-lg font-medium hover:bg-red-800 transition-colors cursor-pointer"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default UploadErrorPopup;
