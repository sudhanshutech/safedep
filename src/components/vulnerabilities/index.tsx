import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Vulnerabilities({ insights }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Vulnerabilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights?.insight?.vulnerabilities.map((vul, index) => (
          <Card key={index} className="border border-gray-300 p-4 shadow">
            <CardHeader>
              <h3 className="text-lg font-semibold text-red-600">
                {vul.summary}
              </h3>
            </CardHeader>
            <CardContent>
              <p>
                <strong>ID:</strong> {vul.id.value}
              </p>
              <p>
                <strong>Risk Level:</strong>{" "}
                {vul.severities[0]?.risk || "Unknown"}
              </p>
              <p>
                <strong>Published At:</strong>{" "}
                {new Date(vul.publishedAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Modified At:</strong>{" "}
                {new Date(vul.modifiedAt).toLocaleDateString()}
              </p>
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
