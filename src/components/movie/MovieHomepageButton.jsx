import { ChevronRight } from 'lucide-react';

const MovieHomepageButton = ({ homepage }) => {
  if (!homepage) return null;

  return (
    <a
      href={homepage}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-4 bg-cyan-700 hover:bg-cyan-600 text-white px-5 py-3 rounded-md transition"
    >
      Visit Homepage <ChevronRight className="inline-block" />
    </a>
  );
};

export default MovieHomepageButton;
