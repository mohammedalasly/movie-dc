const PageButton = ({ page, currentPage, onClick }) => {
  if (page === '...') {
    return <span className="px-2 text-gray-500">...</span>;
  }

  const isActive = page === currentPage;

  return (
    <button
      onClick={() => onClick(page)}
      className={`px-3 py-2 md:px-5 md:py-3 transition-colors rounded hover:bg-cyan-500 cursor-pointer ${
        isActive ? 'bg-cyan-500 text-white' : 'bg-cyan-50 text-cyan-800'
      }`}
    >
      {page}
    </button>
  );
};

export default PageButton;
