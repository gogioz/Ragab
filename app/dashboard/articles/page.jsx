import ContentList from "@/components/dashboard/ContentList";
export default function ArticlesDashboard() {
  return <ContentList collectionName="articles" label="Articles" newHref="/dashboard/articles/new" />;
}
