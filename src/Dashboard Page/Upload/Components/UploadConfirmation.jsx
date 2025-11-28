function UploadConfirmation({ onConfirm, onCancel }) {
  return (
       <div className="fixed inset-0 flex items-center justify-center z-50 md:pl-[16%] ">
      <div
        className="bg-white rounded-2xl shadow-xl w-[90%] max-w-[420px] p-6
                   animate-scaleIn"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Continue Upload?
        </h2>

        <p className="text-center text-gray-600 mt-2 text-sm">
          Please confirm if you want to proceed.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-[#4c52c0] text-white 
                       hover:bg-[#3b41a8] active:scale-95 transition 
                       shadow-sm text-sm md:text-base"
          >
            Yes, Continue
          </button>

          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg border border-gray-300 
                       hover:bg-gray-100 active:scale-95 transition 
                       text-sm md:text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadConfirmation;
