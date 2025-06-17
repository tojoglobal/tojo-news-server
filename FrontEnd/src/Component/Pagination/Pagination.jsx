import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";

/**
 * Professional, modern, and accessible pagination for dark dashboard.
 * - Highlights current page with accent
 * - Rounded glassy buttons, smooth hover/active state
 * - Responsive and mobile-friendly
 */
const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage: controlledPage,
}) => {
  const [currentPage, setCurrentPage] = useState(controlledPage || 1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Allow controlled pagination if parent sets currentPage
  useEffect(() => {
    if (controlledPage && controlledPage !== currentPage) {
      setCurrentPage(controlledPage);
    }
    // eslint-disable-next-line
  }, [controlledPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  // Show max 5 pages; center current if possible
  const getPageNumbers = () => {
    const pageNumbers = [];
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + 4, totalPages);
    if (end - start < 4) start = Math.max(end - 4, 1);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center gap-2 justify-center mt-4 select-none">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded-full p-2 transition bg-[#212639] text-gray-300 hover:bg-blue-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Previous Page"
      >
        <FaChevronLeft />
      </button>
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
          className={`rounded-full px-3 py-1 font-semibold mx-0.5 transition
            ${
              page === currentPage
                ? "bg-blue-500 text-white shadow"
                : "bg-[#23263a] text-gray-200 hover:bg-blue-700 hover:text-white"
            }
            disabled:opacity-90 disabled:cursor-not-allowed
          `}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`rounded-full p-2 transition bg-[#212639] text-gray-300 hover:bg-blue-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Next Page"
      >
        <FaChevronRight />
      </button>
    </nav>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
};

export default Pagination;
