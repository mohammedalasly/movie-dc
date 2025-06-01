import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import MoviePoster from '../components/movie/MoviePoster';
import MovieTrailer from '../components/movie/MovieTrailer';
import MovieGenres from '../components/movie/MovieGenres';
import MovieRating from '../components/movie/MovieRating';
import MovieOverview from '../components/movie/MovieOverview';
import MovieMetadata from '../components/movie/MovieMetadata';
import MovieHomepageButton from '../components/movie/MovieHomepageButton';
import RelatedMovies from '../components/movie/RelatedMovies';
import CastList from '../components/movie/CastList';
import MovieHero from '../components/movie/MovieHero';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetail = () => {
  const { idSlug } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const id = idSlug?.split('-')[0];

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits,images`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              accept: 'application/json',
            },
          }
        );

        if (!res.ok) throw new Error('Failed to fetch movie');

        const data = await res.json();

        // Check for invalid movie data
        if (!data.id || !data.title) {
          navigate('/404', { replace: true });
          return;
        }

        setMovie(data);
        setCast(data.credits?.cast?.slice(0, 5) || []);
        setImages(data.images?.backdrops?.slice(0, 5) || []);
      } catch (error) {
        console.error('Error fetching movie detail:', error);
        navigate('/404', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieDetail();
    else navigate('/404', { replace: true });
  }, [id, navigate]);

  if (loading) return <Spinner />;

  return (
    <div className="text-white">
      <MovieHero images={images} />

      <div className="p-4 md:p-10 max-w-full mx-auto">
        <div className="flex flex-col md:flex-row gap-14 md:gap-6">
          <MoviePoster src={movie.poster_path} title={movie.title} />
          <div className="w-full md:w-2/2">
            <MovieTrailer
              trailerKey={
                movie.videos?.results?.find((v) => v.type === 'Trailer')?.key
              }
            />
            <MovieGenres genres={movie.genres} />
            <MovieRating
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
            />
            <MovieOverview overview={movie.overview} />
            <MovieMetadata
              releaseDate={new Date(movie.release_date).toLocaleDateString()}
              countries={movie.production_countries?.map((c) => c.name)}
              status={movie.status}
              languages={movie.spoken_languages?.map((l) => l.english_name)}
              runtime={movie.runtime}
              tagline={movie.tagline}
            />
            <MovieHomepageButton homepage={movie.homepage} />
          </div>
        </div>
        <RelatedMovies movieId={id} />
        <CastList cast={cast} />
      </div>
    </div>
  );
};

export default MovieDetail;
