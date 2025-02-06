import ChatsHome from "@/components/dashboard";
import sampleData from "../sampleData/sample.json";

/* This component is the fetching data from the insights-client using server side props */

// import { getPackageVersionInsightData } from "../../insights-client";

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

interface HomeProps {
  data: any;
  error?: string;
}

export default function Home({ data, error }: HomeProps) {
  const InsightsData = sampleData;
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
