import ChatsHome from "@/components/visuals";
import { getPackageVersionInsightData } from "../../insights-client";
import sampleData from '../sampleData/sample.json';


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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <ChatsHome insights={InsightsData} />
        </div>
      </main>
    </div>
  );
}
