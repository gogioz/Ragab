"use client";
import ContentForm from "@/components/dashboard/ContentForm";
export default function NewArticle() {
  return (
    <div className="p-5 lg:p-10">
      <h1 className="font-display text-white text-3xl font-bold mb-2">New Article</h1>
      <div className="w-12 h-0.5 bg-gold mb-10" />
      <ContentForm collectionName="articles" />
    </div>
  );
}
