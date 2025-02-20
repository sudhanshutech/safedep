export const dynamic = "force-dynamic";

import PackageDashboard from "./dashboard";
import sampleData from "../sampleData/sample.json";
// import { getPackageVersionInsightData } from "@/lib/insights-client";

export default function Page() {
  return <PackageDashboard insights={sampleData} />;
}

// export default async function Page() {
//   try {
//     const data = await getPackageVersionInsightData(); // Fetch data on the server
//     console.log("Received insights in page:", data);

//     return <PackageDashboard insights={data} />;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return <div>Failed to fetch data</div>; // Handle errors
//   }
// }