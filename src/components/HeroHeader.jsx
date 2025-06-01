import SearchBar from './SearchBar';

const HeroHeader = ({ searchMovies, setSearchMovies }) => (
  <header>
    <h1 className="text-gradient leading-none">Discover Timeless Movies</h1>
    <p className="text-center text-indigo-50 font-light text-xl xs:text-2xl md:text-2xl lg:text-4xl mt-10 mx-auto max-w-200 leading-tight">
      Browse, and explore a library built for movie lovers
    </p>
    <SearchBar searchMovies={searchMovies} setSearchMovies={setSearchMovies} />
  </header>
);

export default HeroHeader;
