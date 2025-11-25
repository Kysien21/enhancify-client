import { useState } from "react";
import UploadConfirmation from "./UploadConfirmation";
import UploadLoading from "./UploadLoading";

function UploadButton({ onConfirmAction, disabled }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleClick = () => {
    if (!disabled) setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);
    setShowLoader(true);

    try {
      await onConfirmAction();
    } catch (error) {
      console.error(error);
    } finally {
      setShowLoader(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={disabled}
        className="px-6 py-2 bg-[#133970] text-white rounded cursor-pointer hover:bg-[#3b41a8] transition disabled:opacity-50 mt-10"
      >
        Upload
      </button>

      {showConfirmation && (
        <UploadConfirmation onConfirm={handleConfirm} onCancel={handleCancel} />
      )}

      {showLoader && <UploadLoading />}
    </>
  );
}

export default UploadButton;
