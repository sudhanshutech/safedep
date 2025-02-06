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
    <div>
      <h2 className="text-xl font-semibold mb-4 mt-10">Available Versions</h2>
      <Table className="w-full border border-gray-300 rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Version</TableHead>
            <TableHead>Published At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedVersions.map((version, index) => (
            <TableRow
              key={index}
              className={`hover:bg-gray-50 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <TableCell className="font-bold">{version.version}</TableCell>
              <TableCell>
                {new Date(version.publishedAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:from-blue-600 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:from-blue-600 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
