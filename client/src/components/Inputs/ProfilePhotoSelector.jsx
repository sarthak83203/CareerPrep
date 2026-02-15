import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

export default function ProfilePhotoSelector({
  image,
  setImage,
  preview,
  setPreview,
}) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      if (setPreview) setPreview(url);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) setPreview(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-8">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div
          onClick={onChooseFile}
          className="group relative w-28 h-28 rounded-full 
          bg-white/5 backdrop-blur-xl
          border border-white/10
          flex items-center justify-center 
          cursor-pointer
          transition-all duration-500
          hover:scale-105 hover:shadow-[0_0_35px_rgba(255,115,0,0.4)]"
        >
          {/* Gradient Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 via-pink-500 to-indigo-500 opacity-0 group-hover:opacity-100 blur-md transition duration-500" />

          {/* Inner Circle */}
          <div className="relative w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center border border-white/10">
            <LuUser className="text-4xl text-orange-400 group-hover:scale-110 transition duration-300" />
          </div>

          {/* Upload Badge */}
          <div
            className="absolute bottom-1 right-1 w-9 h-9
            rounded-full bg-gradient-to-r from-orange-500 to-pink-500
            flex items-center justify-center text-white
            shadow-lg group-hover:scale-110 transition duration-300"
          >
            <LuUpload size={18} />
          </div>
        </div>
      ) : (
        <div className="relative group">
          {/* Glowing Gradient Background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 via-pink-500 to-indigo-500 blur-md opacity-70 group-hover:opacity-100 transition duration-500" />

          <img
            src={preview || previewUrl}
            alt="profile"
            className="relative w-28 h-28 rounded-full object-cover
            ring-4 ring-white/10
            transition-all duration-500
            group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <div
            onClick={onChooseFile}
            className="absolute inset-0 rounded-full bg-black/50 opacity-0 
            group-hover:opacity-100 
            flex items-center justify-center 
            transition duration-300 cursor-pointer"
          >
            <LuUpload className="text-white text-2xl" />
          </div>

          {/* Delete Button */}
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -bottom-2 -right-2 w-9 h-9
            rounded-full bg-gradient-to-r from-red-500 to-rose-600
            text-white flex items-center justify-center
            shadow-lg hover:scale-110
            transition-all duration-300"
          >
            <LuTrash size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
