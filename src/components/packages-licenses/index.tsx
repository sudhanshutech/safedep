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
      <Card className=" w-full h-60 md:w-auto max-w-md mb-6 shadow-lg" style={{ background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(164,60,230,1) 0%, rgba(237,222,222,1) 62%, rgba(233,226,216,1) 100%, rgba(252,176,69,1) 100%)' }}>
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
