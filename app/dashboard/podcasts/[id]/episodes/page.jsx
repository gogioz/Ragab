"use client";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import ImageUpload from "@/components/dashboard/ImageUpload";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiArrowLeft } from "react-icons/fi";

const empty = { nameEn: "", nameAr: "", descriptionEn: "", descriptionAr: "", link: "", image: "" };

export default function EpisodesPage({ params }) {
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const epRef = collection(db, "podcasts", params.id, "episodes");

  const fetchAll = async () => {
    setLoading(true);
    const showSnap = await getDoc(doc(db, "podcasts", params.id));
    if (showSnap.exists()) setShow({ id: showSnap.id, ...showSnap.data() });
    try {
      const snap = await getDocs(query(epRef, orderBy("createdAt", "desc")));
      setEpisodes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch {
      const snap = await getDocs(epRef);
      setEpisodes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, [params.id]);

  const openNew = () => { setForm(empty); setError(""); setModal("new"); };
  const openEdit = (ep) => { setForm({ ...empty, ...ep }); setError(""); setModal(ep); };
  const closeModal = () => { setModal(null); setError(""); };

  const handleSave = async () => {
    if (!form.nameEn && !form.nameAr) { setError("Enter at least one episode name."); return; }
    setSaving(true); setError("");
    try {
      if (modal === "new") {
        await addDoc(epRef, { ...form, createdAt: serverTimestamp() });
      } else {
        await updateDoc(doc(db, "podcasts", params.id, "episodes", modal.id), { ...form, updatedAt: serverTimestamp() });
      }
      await fetchAll();
      closeModal();
    } catch { setError("Failed to save."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (epId) => {
    if (!confirm("Delete this episode?")) return;
    setDeleting(epId);
    await deleteDoc(doc(db, "podcasts", params.id, "episodes", epId));
    setEpisodes(prev => prev.filter(e => e.id !== epId));
    setDeleting(null);
  };

  return (
    <div className="p-5 lg:p-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 lg:mb-10">
        <div>
          <Link href="/dashboard/podcasts"
            className="inline-flex items-center gap-2 font-sans text-white/40 text-xs tracking-widest uppercase hover:text-gold transition-colors mb-4">
            <FiArrowLeft /> All Shows
          </Link>
          <div className="flex items-center gap-3 lg:gap-4">
            {show?.coverImage && <img src={show.coverImage} alt="" className="w-12 h-12 lg:w-14 lg:h-14 object-cover border border-white/10" />}
            <div>
              <h1 className="font-display text-white text-2xl lg:text-3xl font-bold">{show?.titleEn || show?.titleAr || "Podcast"}</h1>
              <p className="font-sans text-white/40 text-sm mt-1">{episodes.length} episode{episodes.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <div className="w-12 h-0.5 bg-gold mt-4" />
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-gold text-navy font-sans text-xs font-bold tracking-widest uppercase px-4 py-3 lg:px-6 hover:bg-gold-light transition-colors whitespace-nowrap flex-shrink-0">
          <FiPlus /> <span className="hidden sm:inline">Add Episode</span>
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="text-white/30 font-sans text-sm animate-pulse">Loading...</div>
      ) : episodes.length === 0 ? (
        <div className="border border-dashed border-white/10 p-10 lg:p-16 text-center">
          <p className="font-sans text-white/30 text-sm mb-4">No episodes yet.</p>
          <button onClick={openNew} className="font-sans text-gold text-xs tracking-widest uppercase">+ Add first episode</button>
        </div>
      ) : (
        <div className="space-y-3">
          {episodes.map((ep, i) => (
            <div key={ep.id} className="flex items-center gap-3 lg:gap-5 bg-white/3 border border-white/10 px-4 lg:px-6 py-4 hover:border-gold/20 transition-all">
              <span className="font-display text-white/20 text-sm font-bold w-6 flex-shrink-0 hidden sm:block">
                {String(episodes.length - i).padStart(2, "0")}
              </span>
              {ep.image
                ? <img src={ep.image} alt="" className="w-12 h-12 lg:w-14 lg:h-14 object-cover flex-shrink-0 border border-white/10" />
                : <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white/5 border border-white/10 flex-shrink-0" />
              }
              <div className="flex-1 min-w-0">
                <p className="font-display text-white font-bold truncate text-sm lg:text-base">{ep.nameEn || ep.nameAr || "Untitled"}</p>
                {ep.nameAr && (
                  <p className="font-sans text-white/40 text-xs truncate mt-0.5" dir="rtl"
                    style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>{ep.nameAr}</p>
                )}
                {ep.link && (
                  <a href={ep.link} target="_blank" rel="noopener noreferrer"
                    className="font-sans text-gold/50 text-xs hover:text-gold truncate block mt-1 max-w-xs hidden sm:block">{ep.link}</a>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => openEdit(ep)} className="text-white/30 hover:text-gold transition-colors p-1"><FiEdit2 size={15} /></button>
                <button onClick={() => handleDelete(ep.id)} disabled={deleting === ep.id}
                  className="text-white/30 hover:text-red-400 transition-colors disabled:opacity-50 p-1"><FiTrash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal !== null && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-start justify-center sm:p-6 overflow-y-auto">
          <div className="bg-[#0d1520] border border-white/10 w-full max-w-3xl sm:my-8 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between px-5 lg:px-8 py-5 lg:py-6 border-b border-white/10 sticky top-0 bg-[#0d1520] z-10">
              <h2 className="font-display text-white text-lg lg:text-xl font-bold">
                {modal === "new" ? "New Episode" : "Edit Episode"}
              </h2>
              <button onClick={closeModal} className="text-white/30 hover:text-white transition-colors"><FiX size={20} /></button>
            </div>

            <div className="px-5 lg:px-8 py-6 lg:py-8 space-y-6 lg:space-y-7">
              {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 font-sans text-sm px-4 py-3">{error}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Episode Name (English)</label>
                  <input type="text" value={form.nameEn} onChange={e => set("nameEn", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
                    placeholder="Episode title in English..." />
                </div>
                <div>
                  <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">اسم الحلقة (عربي)</label>
                  <input type="text" value={form.nameAr} onChange={e => set("nameAr", e.target.value)} dir="rtl"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
                    placeholder="عنوان الحلقة بالعربية..." style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Description (English)</label>
                  <textarea rows={4} value={form.descriptionEn} onChange={e => set("descriptionEn", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20 resize-none"
                    placeholder="What is this episode about..." />
                </div>
                <div>
                  <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">الوصف (عربي)</label>
                  <textarea rows={4} value={form.descriptionAr} onChange={e => set("descriptionAr", e.target.value)} dir="rtl"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20 resize-none"
                    placeholder="عن ماذا تتحدث هذه الحلقة..." style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }} />
                </div>
              </div>

              <div>
                <label className="font-sans text-xs tracking-widest uppercase text-white/40 mb-2 block">Episode Link</label>
                <input type="url" value={form.link} onChange={e => set("link", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
                  placeholder="https://spotify.com/... or YouTube link..." />
              </div>

              <ImageUpload label="Episode Image" value={form.image} onChange={url => set("image", url)} />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-5 lg:px-8 py-5 lg:py-6 border-t border-white/10">
              <button onClick={handleSave} disabled={saving}
                className="flex items-center justify-center gap-2 bg-gold text-navy font-sans text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-gold-light transition-colors disabled:opacity-50">
                <FiCheck /> {saving ? "Saving..." : modal === "new" ? "Add Episode" : "Save Changes"}
              </button>
              <button onClick={closeModal}
                className="border border-white/20 text-white/50 font-sans text-xs tracking-widest uppercase px-8 py-4 hover:border-white/40 hover:text-white transition-colors text-center">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
