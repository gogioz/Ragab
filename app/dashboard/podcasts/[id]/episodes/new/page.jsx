"use client";
import { useState } from "react";
import { collection, addDoc, doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/dashboard/ImageUpload";

export default function NewEpisode({ params }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ titleEn: "", titleAr: "", descriptionEn: "", descriptionAr: "", link: "", image: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.titleEn && !form.titleAr) return alert("Please enter a title.");
    setSaving(true);
    try {
      await addDoc(collection(db, "podcasts", params.id, "episodes"), { ...form, createdAt: serverTimestamp() });
      await updateDoc(doc(db, "podcasts", params.id), { episodeCount: increment(1) });
      router.push(`/dashboard/podcasts/${params.id}/episodes`);
    } catch { alert("Failed to save."); }
    finally { setSaving(false); }
  };

  return (
    <div className="p-10 max-w-4xl">
      <h1 className="font-display text-white text-3xl font-bold mb-2">New Episode</h1>
      <div className="w-12 h-0.5 bg-gold mb-10" />
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Episode Title (English)</label>
            <input type="text" value={form.titleEn} onChange={e => set("titleEn", e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
              placeholder="Episode title in English..." />
          </div>
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">عنوان الحلقة (عربي)</label>
            <input type="text" value={form.titleAr} onChange={e => set("titleAr", e.target.value)} dir="rtl"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
              placeholder="عنوان الحلقة بالعربية..." style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Description (English)</label>
            <textarea rows={5} value={form.descriptionEn} onChange={e => set("descriptionEn", e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20 resize-none"
              placeholder="What is this episode about..." />
          </div>
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">وصف الحلقة (عربي)</label>
            <textarea rows={5} value={form.descriptionAr} onChange={e => set("descriptionAr", e.target.value)} dir="rtl"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20 resize-none"
              placeholder="عن ماذا تتحدث هذه الحلقة..." style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }} />
          </div>
        </div>
        <div>
          <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Episode Link (Spotify / YouTube / SoundCloud...)</label>
          <input type="url" value={form.link} onChange={e => set("link", e.target.value)}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
            placeholder="https://open.spotify.com/..." />
        </div>
        <ImageUpload label="Episode Image" value={form.image} onChange={v => set("image", v)} />
        <div className="flex gap-4 pt-4 border-t border-white/10">
          <button onClick={handleSave} disabled={saving}
            className="bg-gold text-navy font-sans text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-gold-light transition-colors disabled:opacity-50">
            {saving ? "Saving..." : "Publish Episode"}
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
