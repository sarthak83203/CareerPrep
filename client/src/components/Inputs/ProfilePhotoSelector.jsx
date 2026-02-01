//getting react items...
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
        <div className="flex justify-center mb-6">
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
                    className="w-24 h-24 rounded-full border-2 border-dashed border-orange-400 flex items-center justify-center relative cursor-pointer hover:bg-orange-50 transition"
                >
                    <LuUser className="text-3xl text-orange-400" />
                    <span className="absolute bottom-1 right-1 w-7 h-7 flex items-center justify-center rounded-full bg-orange-500 text-white">
                        <LuUpload size={16} />
                    </span>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={preview || previewUrl}
                        alt="profile"
                        className="w-24 h-24 rounded-full object-cover ring-2 ring-orange-400"
                    />
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-600 transition"
                    >
                        <LuTrash size={15} />
                    </button>
                </div>
            )}
        </div>
    );
}
