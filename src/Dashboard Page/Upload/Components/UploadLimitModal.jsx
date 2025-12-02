import { Clock, AlertTriangle, X } from "lucide-react";

function UploadLimitModal({ isOpen, onClose, resetAt, hoursLeft }) {
  if (!isOpen) return null;

  const formatResetTime = (isoString) => {
    if (!isoString) return "soon";
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 p-4 rounded-full">
            <AlertTriangle className="w-12 h-12 text-yellow-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Upload Limit Reached
        </h2>

        <p className="text-gray-600 text-center mb-6">
          You've reached your daily upload limit of <strong>2 resumes</strong>.
        </p>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 text-blue-800 mb-2">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Reset Time</span>
          </div>
          <p className="text-blue-700 text-sm">
            You can upload again in <strong>{hoursLeft || 24} hour(s)</strong>
          </p>
          {resetAt && (
            <p className="text-blue-600 text-xs mt-1">
              Available at: {formatResetTime(resetAt)}
            </p>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700 text-center">
            💡 <strong>Tip:</strong> You can still view your previous optimizations in the History section!
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 active:scale-95"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default UploadLimitModal;