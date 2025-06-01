import { ChevronLast } from 'lucide-react';

const NextButton = ({ currentPage, totalPages, onClick }) => {
  return (
    <button
      className="px-2 py-2 md:px-4 md:py-7 bg-cyan-700 text-white rounded-r-lg disabled:opacity-50 cursor-pointer"
      onClick={() => onClick(Math.min(currentPage + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      <ChevronLast />
    </button>
  );
};

export default NextButton;
