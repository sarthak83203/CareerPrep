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
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-30
          bg-gradient-to-br from-black/40 via-black/30 to-black/40
          backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 z-40 h-screen
          w-full md:w-[38vw] max-w-xl
          bg-white
          border-l border-slate-200
          shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          transition-all duration-500 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Glow Edge */}
        <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />

        {/* Content */}
        <div className="flex flex-col h-full p-6">

          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
            <h5 className="text-lg font-semibold tracking-tight text-slate-800">
              {title}
            </h5>

            <button
              onClick={onClose}
              className="
                w-9 h-9 flex items-center justify-center
                rounded-xl
                bg-slate-100
                text-slate-600
                transition-all duration-300
                hover:bg-red-500 hover:text-white
                hover:rotate-90
                active:scale-95
              "
            >
              <LuX className="text-lg" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
