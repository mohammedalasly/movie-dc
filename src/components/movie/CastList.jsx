const CastList = ({ cast }) => (
  <div className="mt-32">
    <h2 className="text-2xl lg:text-4xl font-bold mb-10 text-left">
      Top Casts
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {cast.map((actor) => (
        <div key={actor.id}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                : '/no-pic.png'
            }
            alt={actor.name}
            className="w-full object-cover rounded-lg mb-4"
          />
          <p className="font-medium">{actor.name}</p>
          <p className="text-sm text-gray-400">{actor.character}</p>
        </div>
      ))}
    </div>
  </div>
);

export default CastList;
