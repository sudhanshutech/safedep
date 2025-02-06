import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useState } from "react";

export default function PackageInfo({ insights }) {
  const licenses =
    insights?.insight?.licenses?.licenses.map((l) => l.licenseId).join(", ") ||
    "N/A";
  const publishedAt = new Date(
    insights?.insight?.packagePublishedAt
  ).toLocaleDateString();
  const registries = insights?.insight?.registries?.join(", ") || "N/A";

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const versions = insights?.insight?.availableVersions || [];
  const totalPages = Math.ceil(versions.length / itemsPerPage);

  const displayedVersions = versions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Package Information</h2>
      <Card className="mb-6">
        <CardHeader>
          <h3 className="text-xl font-semibold">General Details</h3>
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
      <h3 className="text-xl font-semibold mb-4">Available Versions</h3>
      <Table className="w-full mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Version</TableHead>
            <TableHead>Published At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedVersions.map((version, index) => (
            <TableRow key={index}>
              <TableCell>{version.version}</TableCell>
              <TableCell>
                {new Date(version.publishedAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
