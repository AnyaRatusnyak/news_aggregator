import React from "react";
import './Pagination.scss';


type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  return (
    <div className="page-pagination">
      <nav
        className="pagination is-small"
        role="navigation"
        aria-label="pagination"
      >
        <button
          className="pagination-previous"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="pagination-next"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          Next page
        </button>
        <ul className="pagination-list">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                className={`pagination-link ${
                  currentPage === index + 1 ? "is-current" : ""
                }`}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
