import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from '../appwrite.js';

import HeroHeader from '../components/HeroHeader.jsx';
import TrendingMovies from '../components/TrendingMovies.jsx';
import MoviesGrid from '../components/MoviesGrid.jsx';
import PaginationControls from '../components/pagination/PaginationControls.jsx';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};
const API_BASE_URL = 'https://api.themoviedb.org/3';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = parseInt(searchParams.get('page')) || 1;

  const [searchMovies, setSearchMovies] = useState('');
  const [debouncedSearchMovies, setDebouncedSearchMovies] = useState('');
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(10);
  const [genreMap, setGenreMap] = useState({});

  useDebounce(() => setDebouncedSearchMovies(searchMovies), 500, [
    searchMovies,
  ]);

  useEffect(() => {
    const currentQuery = searchParams.get('query') || '';

    if (debouncedSearchMovies !== currentQuery) {
      const newParams = new URLSearchParams(searchParams);
      if (debouncedSearchMovies) {
        newParams.set('query', debouncedSearchMovies);
      } else {
        newParams.delete('query');
      }
      newParams.set('page', '1');
      setSearchParams(newParams);
    }
  }, [debouncedSearchMovies, searchParams, setSearchParams]);
  
  

  const fetchMovies = async (query = '', page = 1) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
            query
          )}&page=${page}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      if (!response.ok || data.Response === 'False') {
        throw new Error(data.error || 'Failed to fetch movies');
      }
      setFetchedMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages, 10));
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/genre/movie/list`, API_OPTIONS);
      const data = await res.json();
      const genreDict = {};
      data.genres.forEach((g) => (genreDict[g.id] = g.name));
      setGenreMap(genreDict);
    } catch (error) {
      console.error('Failed to fetch genres', error);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };

  useEffect(() => {
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page')) || 1;
    fetchMovies(query, page);
  }, [searchParams]);
  

  useEffect(() => {
    loadTrendingMovies();
    fetchGenres();
  }, []);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <HeroHeader
            searchMovies={searchMovies}
            setSearchMovies={setSearchMovies}
          />
          <TrendingMovies trendingMovies={trendingMovies} />
          <MoviesGrid
            movies={fetchedMovies}
            isLoading={isLoading}
            errorMessage={errorMessage}
            genres={genreMap}
          />
          <PaginationControls
            currentPage={queryPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set('page', String(page));
              setSearchParams(newParams);
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
