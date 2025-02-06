import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PackageDetails({ insights }) {
  return (
    <div className="p-4">
      <Card className=" w-full h-60 md:w-auto max-w-md mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500  ">
        <CardHeader>
          <CardTitle>Package Information</CardTitle>
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
