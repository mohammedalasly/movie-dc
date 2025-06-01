const MovieTrailer = ({ trailerKey }) => {
  if (!trailerKey) return null;

  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
      <iframe
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title="Trailer"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};

export default MovieTrailer;
