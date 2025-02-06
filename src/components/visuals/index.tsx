import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Type definitions for better type safety
interface InsightData {
  packageVersion?: {
    package?: {
      name: string;
    };
    version: string;
  };
  insight?: {
    dependencies: Array<{
      package: { name: string };
      version: string;
    }>;
    vulnerabilities: Array<{
      id: { value: string };
      summary: string;
    }>;
  };
}

interface PageProps {
  insights?: InsightData;
  error?: string;
}

export default function ChatsHome({ insights, error }: PageProps) {
  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  if (!insights) {
    return <div className="p-4">Loading...</div>;
  }

  const dependencyData = {
    labels: insights.insight?.dependencies.map((dep) => dep.package.name) || [],
    datasets: [
      {
        label: "Dependencies",
        data:
          insights.insight?.dependencies.map((dep) =>
            parseFloat(dep.version)
          ) || [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Package Security Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Package Details</h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                📦 Name: {insights.packageVersion?.package?.name || "N/A"}
              </p>
              <p className="text-gray-700">
                🏷️ Version: {insights.packageVersion?.version || "N/A"}
              </p>
            </div>
          </section>
        </CardContent>
      </Card>
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Dependencies</h3>
        <Bar data={dependencyData} />
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Dependencies Table</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Version</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {insights.insight?.dependencies.map((dep, index) => (
              <TableRow key={index}>
                <TableCell>{dep.package.name}</TableCell>
                <TableCell>{dep.version}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Vulnerabilities</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Summary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {insights.insight?.vulnerabilities.map((vul, index) => (
              <TableRow key={index}>
                <TableCell>{vul.id.value}</TableCell>
                <TableCell>{vul.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
