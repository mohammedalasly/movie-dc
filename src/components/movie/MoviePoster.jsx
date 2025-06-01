const MoviePoster = ({ src, title }) => (
  <img
    src={src ? `https://image.tmdb.org/t/p/w500${src}` : '/poster-default.png'}
    alt={title}
    className="w-full md:w-[36%] h-fit rounded-lg shadow-cyan-800 shadow-lg opacity-50"
  />
);

export default MoviePoster;
