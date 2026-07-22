"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiList } from "react-icons/fi";

export default function PodcastsDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "podcasts"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch {
      const snap = await getDocs(collection(db, "podcasts"));
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this podcast show?")) return;
    setDeleting(id);
    await deleteDoc(doc(db, "podcasts", id));
    setItems(prev => prev.filter(i => i.id !== id));
    setDeleting(null);
  };

  return (
    <div className="p-5 lg:p-10">
      <div className="flex items-center justify-between mb-8 lg:mb-10">
        <div>
          <h1 className="font-display text-white text-3xl lg:text-4xl font-bold">Podcasts</h1>
          <p className="font-sans text-white/40 text-sm mt-1">{items.length} show{items.length !== 1 ? "s" : ""}</p>
          <div className="w-12 h-0.5 bg-gold mt-3" />
        </div>
        <Link href="/dashboard/podcasts/new"
          className="flex items-center gap-2 bg-gold text-navy font-sans text-xs font-bold tracking-widest uppercase px-4 py-3 lg:px-6 hover:bg-gold-light transition-colors">
          <FiPlus /> <span className="hidden sm:inline">New Show</span>
        </Link>
      </div>

      {loading ? (
        <div className="text-white/30 font-sans text-sm animate-pulse">Loading...</div>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-white/10 p-10 lg:p-16 text-center">
          <p className="font-sans text-white/30 text-sm mb-4">No podcast shows yet.</p>
          <Link href="/dashboard/podcasts/new" className="font-sans text-gold text-xs tracking-widest uppercase">+ Add your first show</Link>
        </div>
      ) : (
        <div className="space-y-3 lg:space-y-4">
          {items.map(item => (
            <div key={item.id}
              className="flex items-center gap-3 lg:gap-5 bg-white/3 border border-white/10 px-4 lg:px-6 py-4 hover:border-gold/20 transition-all">
              {item.coverImage
                ? <img src={item.coverImage} alt="" className="w-12 h-12 lg:w-16 lg:h-16 object-cover flex-shrink-0 border border-white/10" />
                : <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/5 border border-white/10 flex-shrink-0" />
              }
              <div className="flex-1 min-w-0">
                <p className="font-display text-white font-bold truncate text-sm lg:text-base">{item.titleEn || item.titleAr || "Untitled"}</p>
                {item.titleAr && (
                  <p className="font-sans text-white/40 text-xs lg:text-sm truncate mt-0.5" dir="rtl"
                    style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>{item.titleAr}</p>
                )}
              </div>
              <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
                <Link href={`/dashboard/podcasts/${item.id}/episodes`}
                  className="flex items-center gap-1 lg:gap-2 border border-gold/30 text-gold font-sans text-xs tracking-widest uppercase px-3 py-2 lg:px-4 hover:bg-gold/10 transition-colors">
                  <FiList size={13} /> <span className="hidden sm:inline">Episodes</span>
                </Link>
                <Link href={`/dashboard/podcasts/${item.id}/edit`} className="text-white/30 hover:text-gold transition-colors p-1">
                  <FiEdit2 size={15} />
                </Link>
                <button onClick={() => handleDelete(item.id)} disabled={deleting === item.id}
                  className="text-white/30 hover:text-red-400 transition-colors disabled:opacity-50 p-1">
                  <FiTrash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
