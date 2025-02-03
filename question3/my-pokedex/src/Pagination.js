import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
}) {
  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="pagination-button"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
