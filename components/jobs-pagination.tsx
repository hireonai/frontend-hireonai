import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface JobsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export function JobsPagination({
  currentPage,
  totalPages,
  onPageChange,
  hasPrevPage,
  hasNextPage,
}: JobsPaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("ellipsis", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(
          1,
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          totalPages
        );
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          {hasPrevPage && (
            <PaginationLink
              href="#"
              aria-disabled={!hasPrevPage}
              onClick={(e) => {
                e.preventDefault();
                if (hasPrevPage) onPageChange(currentPage - 1);
              }}
            >
              Prev
            </PaginationLink>
          )}
        </PaginationItem>
        {pageNumbers.map((num, idx) =>
          num === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={num}>
              <PaginationLink
                className={`${
                  num === currentPage ? "bg-[#4A90A4] text-white" : ""
                } transition-all duration-300 hover:scale-105`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (num !== currentPage) onPageChange(num);
                }}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          {hasNextPage && (
            <PaginationLink
              href="#"
              aria-disabled={!hasNextPage}
              onClick={(e) => {
                e.preventDefault();
                if (hasNextPage) onPageChange(currentPage + 1);
              }}
            >
              Next
            </PaginationLink>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
