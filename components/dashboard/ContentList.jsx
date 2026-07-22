"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink } from "react-icons/fi";

export default function ContentList({ collectionName, label, newHref }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      const snap = await getDocs(collection(db, collectionName));
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    setDeleting(id);
    await deleteDoc(doc(db, collectionName, id));
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleting(null);
  };

  return (
    <div className="p-5 lg:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 lg:mb-10">
        <div>
          <h1 className="font-display text-white text-3xl lg:text-4xl font-bold">{label}</h1>
          <p className="font-sans text-white/40 text-sm mt-1">{items.length} item{items.length !== 1 ? "s" : ""}</p>
          <div className="w-12 h-0.5 bg-gold mt-3" />
        </div>
        <Link href={newHref}
          className="flex items-center gap-2 bg-gold text-navy font-sans text-xs font-bold tracking-widest uppercase px-4 py-3 lg:px-6 hover:bg-gold-light transition-colors">
          <FiPlus /> <span className="hidden sm:inline">Add New</span>
        </Link>
      </div>

      {/* List */}
      {loading ? (
        <div className="text-white/30 font-sans text-sm animate-pulse">Loading...</div>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-white/10 p-10 lg:p-16 text-center">
          <p className="font-sans text-white/30 text-sm mb-4">No {label.toLowerCase()} yet.</p>
          <Link href={newHref} className="font-sans text-gold text-xs tracking-widest uppercase">
            + Add your first {label.slice(0, -1).toLowerCase()}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id}
              className="flex items-center gap-3 lg:gap-5 bg-white/3 border border-white/10 px-4 lg:px-6 py-4 hover:border-gold/20 transition-all group">
              {/* Cover thumbnail */}
              {item.coverImage ? (
                <img src={item.coverImage} alt="" className="w-12 h-12 lg:w-14 lg:h-14 object-cover flex-shrink-0 border border-white/10" />
              ) : (
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white/5 border border-white/10 flex-shrink-0" />
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-display text-white font-bold truncate text-sm lg:text-base">
                  {item.titleEn || item.titleAr || "Untitled"}
                </p>
                {item.titleAr && item.titleEn && (
                  <p className="font-sans text-white/40 text-xs lg:text-sm truncate mt-0.5" dir="rtl"
                    style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>{item.titleAr}</p>
                )}
                <p className="font-sans text-white/30 text-xs mt-1 hidden sm:block">{item.date}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
                {(item.externalLink || item.podcastLink) && (
                  <a href={item.externalLink || item.podcastLink} target="_blank" rel="noopener noreferrer"
                    className="text-white/30 hover:text-gold transition-colors hidden sm:block">
                    <FiExternalLink size={15} />
                  </a>
                )}
                <Link href={`/dashboard/${collectionName}/${item.id}/edit`}
                  className="text-white/30 hover:text-gold transition-colors p-1">
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
