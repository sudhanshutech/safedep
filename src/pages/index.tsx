import ChatsHome from "@/components/visuals";
import { getPackageVersionInsightData } from "../../insights-client";
import sampleData from "../sampleData/sample.json";

// export async function getServerSideProps() {
//   try {
//     const data = await getPackageVersionInsightData();
//     console.log("Received insights in page:", data);
//     return {
//       props: {
//         data, // Pass the fetched data as props to the page
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         error: "Failed to fetch data", // Handle errors gracefully
//       },
//     };
//   }
// }
export default function Home({ data, error }) {
  const InsightsData = sampleData;
  // console.log("Data in page:", data);
  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div>
      <div>
        <ChatsHome insights={InsightsData} />
      </div>
    </div>
  );
}
