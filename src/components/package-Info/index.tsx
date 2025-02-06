import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Insights {
  packageVersion?: {
    package?: {
      name?: string;
    };
    version?: string;
  };
}

export default function PackageDetails({ insights }: { insights: Insights }) {
  return (
    <div className="p-4">
      <Card
        className="w-full h-60 md:w-auto max-w-md mb-6"
        style={{
          background:
            "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(164,60,230,1) 0%, rgba(237,222,222,1) 62%, rgba(233,226,216,1) 100%, rgba(252,176,69,1) 100%)",
        }}
      >
        <CardHeader>
          <h3 className="text-xl font-semibold">Package Information</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-bold">📦 Name:</span>{" "}
              {insights.packageVersion?.package?.name || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">🏷️ Version:</span>{" "}
              {insights.packageVersion?.version || "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
