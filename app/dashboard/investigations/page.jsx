import ContentList from "@/components/dashboard/ContentList";
export default function InvestigationsDashboard() {
  return <ContentList collectionName="investigations" label="Investigations" newHref="/dashboard/investigations/new" />;
}
