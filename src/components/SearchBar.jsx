import { Search } from 'lucide-react';

const SearchBar = ({ searchMovies, setSearchMovies }) => {
  return (
    <div className="search"><div>
        <Search className='text-cyan-400'/>
        <input
          type="text"
          placeholder="Search movies you like"
          value={searchMovies}
          onChange={(e) => setSearchMovies(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
