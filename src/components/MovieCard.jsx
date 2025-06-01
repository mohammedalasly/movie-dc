import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  } = movie;

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

  const movieSlug = `${id}-${slugify(title)}`;

  return (
    <div className="movie-card">
      <Link to={`/movie/${movieSlug}`}>
        <div className="image-wrapper relative group">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : '/poster-default.png'
            }
            alt={title}
          />
          <div className="overlay absolute inset-0 bg-gradient-to-t from-cyan-500 via-black/70 to-black/100 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
        </div>
        <div className="mt-4">
          <h3>{title}</h3>
          <div className="content">
            <div className="rating">
              <img src="rating.svg" alt="Rating Icon" />
              <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>
            <span>•</span>
            <p className="lang">{original_language}</p>
            <span>•</span>
            <p className="year">{release_date?.split('-')[0]}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
