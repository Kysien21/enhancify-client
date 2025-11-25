function UploadConfirmation({ onConfirm, onCancel }) {
  return (
       <div className="fixed inset-0 flex items-center justify-center z-50 md:pl-[16%]">

      {/* Dark background */}
      <div
        className="absolute inset-0"
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div className="relative bg-[#f0f1f6] rounded-xl p-6 
                      w-[450px]
                      ">

        <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
          Are you sure you want to Continue?
        </h2>

        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-[#4c52c0] text-white rounded 
                       hover:bg-[#3b41a8] transition text-sm md:text-base"
          >
            Yes
          </button>

          <button
            onClick={onCancel}
            className="px-6 py-2 bg-white text-black rounded 
                       hover:bg-gray-300 transition text-sm md:text-base"
          >
            No
          </button>
        </div>

      </div>
    </div>
  );
}

export default UploadConfirmation;
