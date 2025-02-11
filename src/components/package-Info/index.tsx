'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
        className="w-full h-60 md:w-auto max-w-md mb-6 shadow-lg"
        style={{
          background: "linear-gradient(to right, #56ccf2, #2f80ed)",
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
