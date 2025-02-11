import PackageDashboard from "./dashboard";
import sampleData from "../sampleData/sample.json";

export default function Page() {
  return <PackageDashboard insights={sampleData} />;
}
