import { Check } from "lucide-react";

function SuccessPopup({ onClose }) {
    return(
            <div className="fixed inset-0 flex items-center justify-center z-50 md:pl-[16%]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto relative animate-fadeIn p-5">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-600" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-blue-900 mb-3 text-center">
         Deleted Succesful
        </h2>

        {/* Message */}
        <p className="text-sm sm:text-md text-blue-900 mb-6 text-center">
          Account has been Deleted
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
    )
}




export default SuccessPopup;
