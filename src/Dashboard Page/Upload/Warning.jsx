function Warning({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      
      <div className="absolute inset-0 "></div>

      
      <div className="relative bg-[#f0f1f6] rounded-xl  p-6 w-80 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-4 text-center">Are you sure you want to continue?</h2>

        <div className="flex gap-4 mt-2">
          <button
            onClick={onConfirm}
            className="px-13 py-2 bg-[#4c52c0] text-white rounded hover:bg-red-600 transition"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-13 py-2 bg-white text-black rounded hover:bg-gray-400 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Warning;