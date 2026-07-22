"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ContentForm from "@/components/dashboard/ContentForm";

export default function EditArticle({ params }) {
  const [item, setItem] = useState(null);
  useEffect(() => {
    getDoc(doc(db, "articles", params.id)).then((d) => {
      if (d.exists()) setItem({ id: d.id, ...d.data() });
    });
  }, [params.id]);
  if (!item) return <div className="p-10 text-white/30 animate-pulse">Loading...</div>;
  return (
    <div className="p-5 lg:p-10">
      <h1 className="font-display text-white text-3xl font-bold mb-2">Edit Article</h1>
      <div className="w-12 h-0.5 bg-gold mb-10" />
      <ContentForm collectionName="articles" existing={item} />
    </div>
  );
}
