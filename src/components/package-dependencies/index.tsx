import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useState } from "react";
import { Badge } from "../ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export default function DependenciesTable({ insights }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dependencies = insights?.insight?.dependencies || [];
  const totalPages = Math.ceil(dependencies.length / itemsPerPage);

  const displayedDependencies = dependencies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 mt-10">Dependencies</h3>
      <div className="overflow-auto" style={{ maxHeight: "600px" }}>
        <Table className="w-full border border-gray-300 rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Name</TableHead>
              <TableHead className="px-4 py-2 border-b-2 border-gray-200">
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
                <TableCell>
                  <Badge className="bg-blue-600 bg-opacity-70 text-gray backdrop-blur-lg">
                    {dep.version}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem className="mr-4">
              <PaginationLink
                onClick={
                  currentPage === 1
                    ? undefined
                    : () => handlePageChange(currentPage - 1)
                }
                className={
                  currentPage === 1 ? "text-gray-400 cursor-not-allowed" : ""
                }
                isDisabled={currentPage === 1}
              >
                Previous
              </PaginationLink>
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationLink
                onClick={
                  currentPage === totalPages
                    ? undefined
                    : () => handlePageChange(currentPage + 1)
                }
                className={
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : ""
                }
                isDisabled={currentPage === totalPages}
              >
                Next
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
