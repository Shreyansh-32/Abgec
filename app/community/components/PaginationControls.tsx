"use client";

import { Button } from "@/components/ui/button";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationControls({
  page,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </Button>

        <div className="hidden md:flex gap-1">
          {Array.from({ length: totalPages })
            .slice(Math.max(0, page - 3), page + 2)
            .map((_, idx) => {
              const pageNum = idx + Math.max(1, page - 2);
              if (pageNum > totalPages) return null;
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`h-8 w-8 rounded-md text-sm transition-colors ${
                    pageNum === page
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
        </div>

        <Button
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
