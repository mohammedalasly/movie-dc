import PageButton from './PageButton.jsx';
import PrevButton from './PrevButton.jsx';
import NextButton from './NextButton.jsx';
import { useScreenSize } from './useScreenSize.js';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const screenSize = useScreenSize();

  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 1) return [1];

    if (screenSize === 'lg') {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (screenSize === 'md') {
      // Show: 1 ... prev current next ... total
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      if (currentPage > 2) pages.push(currentPage - 1);
      if (currentPage !== 1 && currentPage !== totalPages)
        pages.push(currentPage);
      if (currentPage < totalPages - 1) pages.push(currentPage + 1);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    } else {
      // SM screen: show 1 ... current ... total
      pages.push(1);
      if (currentPage > 2) pages.push('...');
      if (currentPage !== 1 && currentPage !== totalPages)
        pages.push(currentPage);
      if (currentPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getVisiblePages();

  return (
    <div className="flex flex-wrap justify-center items-center gap-1 lg:gap-2 my-20 text-sm sm:text-base">
      <PrevButton currentPage={currentPage} onClick={onPageChange} />

      {/* Page Buttons */}
      {pages.map((page, index) => (
        <PageButton
          key={typeof page === 'number' ? `page-${page}` : `ellipsis-${index}`}
          page={page}
          currentPage={currentPage}
          onClick={onPageChange}
        />
      ))}

      <NextButton
        currentPage={currentPage}
        totalPages={totalPages}
        onClick={onPageChange}
      />
    </div>
  );
};

export default PaginationControls;
