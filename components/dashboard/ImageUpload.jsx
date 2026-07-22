"use client";
import { useState } from "react";
import { uploadImage } from "@/lib/cloudinary";
import { FiUpload, FiX, FiLoader } from "react-icons/fi";

export default function ImageUpload({ label = "Image", value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handle = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">{label}</label>

      {value ? (
        <div className="relative inline-block">
          <img src={value} alt="upload preview" className="h-40 w-auto object-cover border border-white/10" />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <FiX size={12} />
          </button>
        </div>
      ) : (
        <label className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed cursor-pointer transition-colors
          ${uploading ? "border-gold/40 bg-gold/5" : "border-white/10 hover:border-gold/40 hover:bg-white/5"}`}>
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-gold">
              <FiLoader className="animate-spin text-2xl" />
              <span className="font-sans text-xs">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-white/30">
              <FiUpload className="text-2xl" />
              <span className="font-sans text-xs">Click to upload</span>
              <span className="font-sans text-xs text-white/20">JPG, PNG, WEBP</span>
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handle} disabled={uploading} />
        </label>
      )}
      {error && <p className="font-sans text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}
