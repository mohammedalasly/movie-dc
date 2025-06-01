const MovieRating = ({ vote_average, vote_count }) => (
  <div className="flex justify-between items-center mb-5">
    <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
      <span>⭐</span>
      <span className="font-semibold">{(vote_average || 0).toFixed(1)}</span>
      <span className="text-sm text-gray-400">
        ({vote_count?.toLocaleString()})
      </span>
    </div>
  </div>
);

export default MovieRating;
