import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useState } from "react";

export default function DependenciesTable({ insights }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dependencies = insights?.insight?.dependencies || [];
  const totalPages = Math.ceil(dependencies.length / itemsPerPage);

  const displayedDependencies = dependencies.slice(
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
      <h3 className="text-xl font-semibold mb-4 mt-10">Dependencies</h3>
      <div className="overflow-auto" style={{ maxHeight: "600px" }}>
        <Table className="w-full border border-gray-300 rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Name</TableHead>
              <TableHead className=" px-4 py-2 border-b-2 border-gray-200">
                Version
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedDependencies.map((dep, index) => (
              <TableRow
                key={index}
                className={`hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <TableCell className="font-bold">{dep.package.name}</TableCell>
                <TableCell>{dep.version}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
