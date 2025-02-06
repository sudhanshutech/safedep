import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PackageInfo({ insights }) {
  const licenses =
    insights?.insight?.licenses?.licenses.map((l) => l.licenseId).join(", ") ||
    "N/A";
  const publishedAt = new Date(
    insights?.insight?.packagePublishedAt
  ).toLocaleDateString();
  const registries = insights?.insight?.registries?.join(", ") || "N/A";

  return (
    <div className="p-4">
      <Card className=" w-full h-60 md:w-auto max-w-md mb-6 shadow-lg">
        <CardHeader>
          <h3 className="text-xl font-semibold">License Details</h3>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            <strong>License:</strong> {licenses}
          </p>
          <p className="mb-2">
            <strong>First Published:</strong> {publishedAt}
          </p>
          <p className="mb-2">
            <strong>Registry:</strong>{" "}
            <a
              href={registries}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {registries}
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
