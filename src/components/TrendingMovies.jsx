import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TrendingMovies = ({ trendingMovies }) => {
  const [moviesWithTitles, setMoviesWithTitles] = useState([]);

  useEffect(() => {
    const fetchTitles = async () => {
      const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
      const API_OPTIONS = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      const movies = await Promise.all(
        trendingMovies.map(async (movie) => {
          if (!movie.title) {
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.movie_id}`,
              API_OPTIONS
            );
            const data = await res.json();
            return { ...movie, title: data.title || 'unknown' };
          }
          return movie;
        })
      );

      setMoviesWithTitles(movies);
    };

    if (trendingMovies.length) {
      fetchTitles();
    }
  }, [trendingMovies]);

  const slugify = (text) =>
    text
      ? text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      : 'unknown';

  if (!moviesWithTitles.length) return null;

  return (
    <section className="trending">
      <h2 className="mb-4">Trending Movies</h2>
      <ul>
        {moviesWithTitles.map((movie, index) => (
          <li key={movie.$id}>
            <p className={index === 9 ? '-mx-8' : ''}>{index + 1}</p>
            <Link to={`/movie/${movie.movie_id}-${slugify(movie.title)}`}>
              <img
                src={movie.poster_url}
                alt={movie.title || 'Trending movie'}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrendingMovies;
