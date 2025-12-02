import { useState } from "react";
import UploadConfirmation from "./UploadConfirmation";
import UploadLoading from "./UploadLoading";

function UploadButton({ onConfirmAction, disabled, isLoading }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleClick = () => {
    if (!disabled) setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);
    setShowLoader(true);

    onConfirmAction();

    // try {
    //   await onConfirmAction();
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setShowLoader(false);
    // }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={disabled}
        className="text-md px-6 py-2 text-white rounded-lg cursor-pointer bg-blue-900 hover:bg-blue-800 active:scale-95 transition disabled:opacity-50 mt-10"
      >
        Upload
      </button>

      {showConfirmation && (
        <UploadConfirmation onConfirm={handleConfirm} onCancel={handleCancel} />
      )}

      {isLoading && <UploadLoading />}
    </>
  );
}

export default UploadButton;
