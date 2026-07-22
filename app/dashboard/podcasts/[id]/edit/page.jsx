"use client";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/dashboard/ImageUpload";

export default function EditPodcast({ params }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(null);

  useEffect(() => {
    getDoc(doc(db, "podcasts", params.id)).then(d => {
      if (d.exists()) setForm({ id: d.id, ...d.data() });
    });
  }, [params.id]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.titleEn && !form.titleAr) { setError("Enter at least one title."); return; }
    setSaving(true);
    try {
      await updateDoc(doc(db, "podcasts", params.id), { ...form, updatedAt: serverTimestamp() });
      router.push("/dashboard/podcasts");
    } catch { setError("Failed to save."); }
    finally { setSaving(false); }
  };

  if (!form) return <div className="p-10 text-white/30 animate-pulse">Loading...</div>;

  return (
    <div className="p-5 lg:p-10 max-w-4xl">
      <h1 className="font-display text-white text-3xl font-bold mb-2">Edit Podcast Show</h1>
      <div className="w-12 h-0.5 bg-gold mb-10" />

      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 font-sans text-sm px-4 py-3 mb-6">{error}</div>}

      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Show Title (English)</label>
            <input type="text" value={form.titleEn || ""} onChange={e => set("titleEn", e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors" />
          </div>
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">اسم البودكاست (عربي)</label>
            <input type="text" value={form.titleAr || ""} onChange={e => set("titleAr", e.target.value)} dir="rtl"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors"
              style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Description (English)</label>
            <textarea rows={5} value={form.descriptionEn || ""} onChange={e => set("descriptionEn", e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors resize-none" />
          </div>
          <div>
            <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">الوصف (عربي)</label>
            <textarea rows={5} value={form.descriptionAr || ""} onChange={e => set("descriptionAr", e.target.value)} dir="rtl"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors resize-none"
              style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }} />
          </div>
        </div>

        <ImageUpload label="Cover Image" value={form.coverImage || ""} onChange={url => set("coverImage", url)} />

        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          <button onClick={handleSave} disabled={saving}
            className="bg-gold text-navy font-sans text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-gold-light transition-colors disabled:opacity-50">
            {saving ? "Saving..." : "Update Show"}
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
