import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage: controlledPage,
}) => {
  const [currentPage, setCurrentPage] = useState(controlledPage || 1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
    <nav className="flex items-center gap-1 justify-center mt-4 select-none">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded-full cursor-pointer p-2 shadow-lg shadow-blue-900/10 bg-[#22283d]/80 border border-[#324266]/40 text-gray-300 hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Previous Page"
        style={{
          backdropFilter: "blur(20px)",
        }}
      >
        <FaChevronLeft />
      </button>
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
          className={`rounded-full cursor-pointer px-3 py-1 font-semibold mx-0.5 shadow-md 
            ${
              page === currentPage
                ? "bg-blue-500 text-white shadow-blue-500/30"
                : "bg-[#23263a]/80 text-gray-200 hover:bg-blue-700 hover:text-white"
            }
            disabled:opacity-90 disabled:cursor-not-allowed
          `}
          style={{
            backdropFilter: "blur(12px)",
            border:
              page === currentPage
                ? "2px solid #3b82f6"
                : "1.5px solid #324266",
            minWidth: 35,
          }}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`rounded-full cursor-pointer p-2 shadow-lg shadow-blue-900/10 bg-[#22283d]/80 border border-[#324266]/40 text-gray-300 hover:bg-blue-700 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Next Page"
        style={{
          backdropFilter: "blur(20px)",
        }}
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
