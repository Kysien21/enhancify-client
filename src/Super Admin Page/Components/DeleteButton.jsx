import { useState } from "react";
import DeletePopup from "./DeletePopup";
function DeleteButton({ onDelete }) {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowDeletePopup(false);
  };
 
  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="flex-1 bg-red-500 text-white px-5 py-1 rounded text-xs font-medium hover:bg-red-600"
      >
        Delete
      </button>

      {showDeletePopup && (
        <DeletePopup
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
}

export default DeleteButton;
