"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { FiTrash2 } from "react-icons/fi";

export default function ContentForm({ collectionName, existing = null, isPodcast = false }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    titleEn: existing?.titleEn || "",
    titleAr: existing?.titleAr || "",
    summaryEn: existing?.summaryEn || "",
    summaryAr: existing?.summaryAr || "",
    date: existing?.date || new Date().toISOString().split("T")[0],
    coverImage: existing?.coverImage || "",
    images: existing?.images || [],
    externalLink: existing?.externalLink || "",
    podcastLink: existing?.podcastLink || "",
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const addImage = (url) => { if (url) set("images", [...form.images, url]); };
  const removeImage = (i) => set("images", form.images.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    if (!form.titleEn && !form.titleAr) { setError("Please enter at least one title."); return; }
    setSaving(true);
    setError("");
    try {
      const data = { ...form, updatedAt: serverTimestamp() };
      if (existing) {
        await updateDoc(doc(db, collectionName, existing.id), data);
      } else {
        await addDoc(collection(db, collectionName), { ...data, createdAt: serverTimestamp() });
      }
      router.push(`/dashboard/${collectionName}`);
    } catch { setError("Failed to save. Try again."); }
    finally { setSaving(false); }
  };

  return (
    <div className="max-w-4xl">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 font-sans text-sm px-4 py-3 mb-6">{error}</div>
      )}

      <div className="space-y-6 lg:space-y-8">
        {/* Titles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Title (English)</label>
            <input type="text" value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
              placeholder="Title in English..." />
          </div>
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">العنوان (عربي)</label>
            <input type="text" value={form.titleAr} onChange={(e) => set("titleAr", e.target.value)} dir="rtl"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
              placeholder="العنوان بالعربية..." style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }} />
          </div>
        </div>

        {/* Summaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Summary (English)</label>
            <textarea rows={5} value={form.summaryEn} onChange={(e) => set("summaryEn", e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20 resize-none"
              placeholder="Brief summary in English..." />
          </div>
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">الملخص (عربي)</label>
            <textarea rows={5} value={form.summaryAr} onChange={(e) => set("summaryAr", e.target.value)} dir="rtl"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20 resize-none"
              placeholder="ملخص بالعربية..." style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }} />
          </div>
        </div>

        {/* Date + Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Date</label>
            <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors" />
          </div>
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">
              {isPodcast ? "Podcast Link" : "External Link"}
            </label>
            <input type="url" value={isPodcast ? form.podcastLink : form.externalLink}
              onChange={(e) => set(isPodcast ? "podcastLink" : "externalLink", e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
              placeholder="https://..." />
          </div>
        </div>

        {/* Cover Image */}
        <ImageUpload label="Cover Image" value={form.coverImage} onChange={(url) => set("coverImage", url)} />

        {/* Additional Images */}
        <div>
          <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-4 block">Additional Images</label>
          <div className="flex flex-wrap gap-3 lg:gap-4 mb-4">
            {form.images.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} alt="" className="h-20 w-20 lg:h-24 lg:w-24 object-cover border border-white/10" />
                <button onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                  <FiTrash2 size={10} />
                </button>
              </div>
            ))}
            <ImageUpload label="" value="" onChange={addImage} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-white/10">
          <button onClick={handleSave} disabled={saving}
            className="bg-gold text-navy font-sans text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? "Saving..." : existing ? "Update" : "Publish"}
          </button>
          <button onClick={() => router.back()}
            className="border border-white/20 text-white/50 font-sans text-xs tracking-widest uppercase px-8 py-4 hover:border-white/40 hover:text-white transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
