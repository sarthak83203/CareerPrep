import { useEffect } from "react";

export default function Modal({
  children,
  isOpen,
  onClose,
  hideHeader = false,
  title = "",
}) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm"
      onClick={onClose} // close when clicking overlay
    >
      <div
        className="relative flex flex-col bg-white shadow-xl rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // prevent overlay close when clicking inside
      >
        {/* Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-orange-100 hover:text-gray-900 transition cursor-pointer"
        >
          <svg
            className="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>

        {/* Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
