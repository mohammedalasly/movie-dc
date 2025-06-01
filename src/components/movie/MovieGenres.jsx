const MovieGenres = ({ genres }) => (
  <div className="flex flex-wrap gap-2 my-6">
    {genres?.map((genre) => (
      <span
        key={genre.id}
        className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
      >
        {genre.name}
      </span>
    ))}
  </div>
);

export default MovieGenres;
