"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/dashboard/ImageUpload";

export default function NewPodcast() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    titleEn: "", titleAr: "",
    descriptionEn: "", descriptionAr: "",
    coverImage: "",
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.titleEn && !form.titleAr) { setError("Enter at least one title."); return; }
    setSaving(true);
    try {
      await addDoc(collection(db, "podcasts"), { ...form, createdAt: serverTimestamp() });
      router.push("/dashboard/podcasts");
    } catch { setError("Failed to save."); }
    finally { setSaving(false); }
  };

  return (
    <div className="p-5 lg:p-10 max-w-4xl">
      <h1 className="font-display text-white text-3xl font-bold mb-2">New Podcast Show</h1>
      <div className="w-12 h-0.5 bg-gold mb-10" />

      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 font-sans text-sm px-4 py-3 mb-6">{error}</div>}

      <div className="space-y-8">
        {/* Titles */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Show Title (English)</label>
            <input type="text" value={form.titleEn} onChange={e => set("titleEn", e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
              placeholder="Podcast show name..." />
          </div>
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">اسم البودكاست (عربي)</label>
            <input type="text" value={form.titleAr} onChange={e => set("titleAr", e.target.value)} dir="rtl"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
              placeholder="اسم البرنامج..." style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }} />
          </div>
        </div>

        {/* Descriptions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Description (English)</label>
            <textarea rows={5} value={form.descriptionEn} onChange={e => set("descriptionEn", e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20 resize-none"
              placeholder="What is this podcast about..." />
          </div>
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">الوصف (عربي)</label>
            <textarea rows={5} value={form.descriptionAr} onChange={e => set("descriptionAr", e.target.value)} dir="rtl"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20 resize-none"
              placeholder="عن ماذا يتحدث هذا البودكاست..." style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }} />
          </div>
        </div>

        {/* Cover */}
        <ImageUpload label="Cover Image" value={form.coverImage} onChange={url => set("coverImage", url)} />

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          <button onClick={handleSave} disabled={saving}
            className="bg-gold text-navy font-sans text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-gold-light transition-colors disabled:opacity-50">
            {saving ? "Saving..." : "Create Show"}
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
