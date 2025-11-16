import { useState } from "react";
import Warning from "./Warning";
import Loading from "./Loading";

function Button({ onConfirmAction, disabled }) {
  const [showWarning, setShowWarning] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleClick = () => {
    if (!disabled) setShowWarning(true); // Show warning popup
  };

  const handleConfirm = async () => {
    setShowWarning(false); // hide warning
    setShowLoader(true);   // show loader

    await onConfirmAction(); // run upload/analysis

    setShowLoader(false);    // hide loader when done
  };

  const handleCancel = () => {
    setShowWarning(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={disabled}
        className="px-6 py-2 bg-black text-white rounded cursor-pointer hover:bg-gray-800 transition disabled:opacity-50"
      >
        Upload
      </button>

      {showWarning && <Warning onConfirm={handleConfirm} onCancel={handleCancel} />}

      {showLoader && <Loading />}
    </>
  );
}

export default Button;
