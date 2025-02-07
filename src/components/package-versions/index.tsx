import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { Badge } from "@/components/ui/badge"; // Import the Badge component

interface Insights {
  insight?: {
    availableVersions?: Array<{
      version: string;
      publishedAt: string;
    }>;
  };
}

export default function VersionLists({ insights }: { insights: Insights }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Sort versions by publishedAt in descending order (newest first)
  const versions = [...(insights?.insight?.availableVersions || [])].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const totalPages = Math.ceil(versions.length / itemsPerPage);

  const displayedVersions = versions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, 5, "...");
    } else if (currentPage > totalPages - 3) {
      pages.push(
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }

    return pages;
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
              <TableCell className="font-bold">
                {version.version}
                {index === 0 && (
                  <Badge
                    variant="outline"
                    className="ml-2 text-xs bg-green-500 text-white"
                  >
                    recommended
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {new Date(version.publishedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
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

            {/* Page Numbers with Ellipsis */}
            {generatePageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === "..." ? (
                  <span className="px-3 py-1 text-gray-500">...</span>
                ) : (
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Next Button */}
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
