"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VulnerabilitiesProps } from "@/lib/types";

export default function Vulnerabilities({
  insights,
}: {
  insights: VulnerabilitiesProps;
}) {
  return (
    <>
      <h2 className="text-xl font-bold mb-4 mt-10">Vulnerabilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights?.insight?.vulnerabilities.map((vul, index) => (
          <Card
            key={index}
            className="border border-gray-300 p-4 shadow-lg bg-white"
          >
            <CardHeader>
              <Badge
                variant="outline"
                className="bg-red-200 text-red-800 border border-red-600 bg-opacity-50 backdrop-filter "
              >
                <h3 className="text-lg font-semibold">{vul.summary}</h3>
              </Badge>
            </CardHeader>
            <CardContent>
              <div>
                <strong>ID:</strong> {vul.id.value}
              </div>
              <div>
                <strong>Risk Level:</strong>{" "}
                <Badge className="bg-yellow-500 text-white">
                  {vul.severities[0]?.risk || "Unknown"}
                </Badge>
              </div>
              <div>
                <strong>Published At:</strong>{" "}
                {new Date(vul.publishedAt).toLocaleDateString()}
              </div>
              <div>
                <strong>Modified At:</strong>{" "}
                {new Date(vul.modifiedAt).toLocaleDateString()}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">
                CVE: {vul.aliases[0]?.value || "N/A"}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
