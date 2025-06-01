import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-5xl">
        <img
          src="/404.webp"
          alt="404 Not Found"
          className="w-full object-contain"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      <div className="mt-8">
        <Link
          to="/"
          className="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded transition text-base sm:text-lg md:text-xl"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
