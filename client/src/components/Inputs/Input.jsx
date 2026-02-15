import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Input({
  value,
  onChange,
  label,
  placeholder,
  type,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full space-y-2">
      {/* Label */}
      <label className="text-sm font-medium text-slate-700 tracking-wide">
        {label}
      </label>

      {/* Input Box */}
      <div className="relative flex items-center bg-white border border-slate-300 rounded-xl px-4 py-3 shadow-sm transition-all duration-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 hover:border-slate-400">
        
        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {/* Password Toggle */}
        {type === "password" && (
          <div
            className="ml-2 transition-all duration-200 hover:scale-110"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FaRegEyeSlash
                size={20}
                className="text-primary cursor-pointer"
              />
            ) : (
              <FaRegEye
                size={20}
                className="text-slate-400 cursor-pointer hover:text-primary"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
