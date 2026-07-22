import ContentList from "@/components/dashboard/ContentList";
export default function ReportsDashboard() {
  return <ContentList collectionName="reports" label="Reports" newHref="/dashboard/reports/new" />;
}
