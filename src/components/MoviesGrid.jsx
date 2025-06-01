import MovieCard from './MovieCard';
import Spinner from './Spinner';

const MoviesGrid = ({ movies, isLoading, errorMessage, genres }) => {
  return (
    <section className="all-movies">
      <h2>All Movies</h2>
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default MoviesGrid;
