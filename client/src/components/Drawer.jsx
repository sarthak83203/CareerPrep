import { LuX } from "react-icons/lu";

export default function Drawer({
  isOpen,
  onClose,
  title,
  children,
}) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-40 h-screen p-6 overflow-y-auto 
        transition-transform duration-300 ease-in-out
        bg-white w-full md:w-[40vw] shadow-2xl
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h5 className="text-lg font-semibold">{title}</h5>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200"
          >
            <LuX className="text-lg" />
          </button>
        </div>

        {children}
      </div>
    </>
  );
}
