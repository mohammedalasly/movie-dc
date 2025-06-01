import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const RelatedMovies = ({ movieId }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            accept: 'application/json',
          },
        }
      );
      const data = await res.json();
      setRelated(data.results?.slice(0, 6) || []);
    };

    if (movieId) fetchRelated();
  }, [movieId]);

  if (!related.length) return null;

  return (
    <div className="mt-22">
      <h2 className="text-2xl lg:text-4xl font-bold mb-10 text-white">
        Related Movies
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {related.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}-${movie.title
              ?.toLowerCase()
              .replace(/\s+/g, '-')}`}
            className="hover:scale-105 transition-transform"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : '/poster-default.png'
              }
              alt={movie.title}
              className="rounded-md w-full h-full object-cover shadow-cyan-800 shadow-md"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedMovies;
