import { ChevronFirst } from 'lucide-react';

const PrevButton = ({ currentPage, onClick }) => {
  return (
    <button
      className="px-2 py-2 md:px-4 md:py-7 bg-cyan-700 text-white rounded-l-lg disabled:opacity-50 cursor-pointer"
      onClick={() => onClick(Math.max(currentPage - 1, 1))}
      disabled={currentPage === 1}
    >
      <ChevronFirst />
    </button>
  );
};

export default PrevButton;
