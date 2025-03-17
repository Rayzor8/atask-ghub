"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface paginationProps {
  currentPage: number;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  totalCount: number;
}

export default function Pagination({
  currentPage,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  totalCount,
}: paginationProps) {
  if (totalCount === 0) return null;

  const startItem = (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, totalCount);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[#30363d]">
      <div className="text-sm text-gray-400">
        Showing {startItem}-{endItem} of {totalCount}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="flex items-center px-3 py-1 text-sm bg-[#21262d] text-gray-300 rounded-md hover:bg-[#30363d] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="flex items-center px-3 py-1 text-sm bg-[#21262d] text-gray-300 rounded-md hover:bg-[#30363d] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
