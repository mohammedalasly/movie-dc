const MovieMetadata = ({
  releaseDate,
  countries,
  status,
  languages,
  runtime,
  tagline,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[1rem] text-gray-200 my-10">
    <div>
      <span className="font-semibold text-white text-xl">Release Date:</span>
      <br />
      {releaseDate}
    </div>
    <div>
      <span className="font-semibold text-white text-xl">Countries:</span>
      <br />
      {countries?.join(', ')}
    </div>
    <div>
      <span className="font-semibold text-white text-xl">Status:</span>
      <br />
      {status}
    </div>
    <div>
      <span className="font-semibold text-white text-xl">Languages:</span>
      <br />
      {languages?.join(', ')}
    </div>
    <div>
      <span className="font-semibold text-white text-xl">Runtime:</span>
      <br />
      {`${Math.floor(runtime / 60)}h ${runtime % 60}m`}
    </div>
    <div className="col-span-2 md:col-span-3">
      <span className="font-semibold text-white text-xl">Tagline:</span>
      <br />
      {tagline}
    </div>
  </div>
);

export default MovieMetadata;
