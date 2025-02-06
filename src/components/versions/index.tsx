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

export default function VersionLists({ insights }) {

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
      <h2 className="text-xl font-semibold mb-4">Available Versions</h2>
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
