"use client";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/dashboard/ImageUpload";

export default function EditEpisode({ params }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    getDoc(doc(db, "podcasts", params.id, "episodes", params.episodeId)).then(d => {
      if (d.exists()) setForm({ titleEn: "", titleAr: "", descriptionEn: "", descriptionAr: "", link: "", image: "", ...d.data() });
    });
  }, [params.id, params.episodeId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "podcasts", params.id, "episodes", params.episodeId), { ...form, updatedAt: serverTimestamp() });
      router.push(`/dashboard/podcasts/${params.id}/episodes`);
    } catch { alert("Failed to save."); }
    finally { setSaving(false); }
  };

  if (!form) return <div className="p-10 text-white/30 animate-pulse">Loading...</div>;

  return (
    <div className="p-10 max-w-4xl">
      <h1 className="font-display text-white text-3xl font-bold mb-2">Edit Episode</h1>
      <div className="w-12 h-0.5 bg-gold mb-10" />
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Episode Title (English)</label>
            <input type="text" value={form.titleEn} onChange={e => set("titleEn", e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors" />
          </div>
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">عنوان الحلقة (عربي)</label>
            <input type="text" value={form.titleAr} onChange={e => set("titleAr", e.target.value)} dir="rtl"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors"
              style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Description (English)</label>
            <textarea rows={5} value={form.descriptionEn} onChange={e => set("descriptionEn", e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors resize-none" />
          </div>
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">وصف الحلقة (عربي)</label>
            <textarea rows={5} value={form.descriptionAr} onChange={e => set("descriptionAr", e.target.value)} dir="rtl"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors resize-none"
              style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }} />
          </div>
        </div>
        <div>
          <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Episode Link</label>
          <input type="url" value={form.link} onChange={e => set("link", e.target.value)}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
            placeholder="https://..." />
        </div>
        <ImageUpload label="Episode Image" value={form.image} onChange={v => set("image", v)} />
        <div className="flex gap-4 pt-4 border-t border-white/10">
          <button onClick={handleSave} disabled={saving}
            className="bg-gold text-navy font-sans text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-gold-light transition-colors disabled:opacity-50">
            {saving ? "Saving..." : "Update Episode"}
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
