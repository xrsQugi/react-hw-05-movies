import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fetchInfo from '../../API';
import css from './MovieList.module.css';
import Loader from '../../components/Loader/Loader';
import defImg from '../DefaultImg/DefaultImg';

export default function MovieList({ movieQuery }) {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const location = useLocation();

  const searchMovies = async query => {
    setStatus('pending');
    try {
      const response = await fetchInfo(`/search/movie?query=${query}&`);
      setMovies(response.results);
      setStatus('resolved');
      setError(false);
    } catch (error) {
      setError(error.message);
      setStatus('rejected');
    }
  };

  useEffect(() => {
    searchMovies(movieQuery);
  }, [movieQuery]);

  if (status === 'pending') {
    return (
      <div className={css.loading_block}>
        <Loader></Loader>
      </div>
    );
  }
  if (status === 'resolved') {
    return (
      <ul className={css.movie_list}>
        {movies.map(movie => (
          <li key={movie.id}>
            <NavLink
              className={css.nav_link}
              to={`${movie.id}`}
              state={{ from: location }}
            >
              <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : defImg
                  }
                  alt="poster of cinema"
                  id={movie.id}
                  className={css.movie_img}
                />
                <div className={css.movie_block_title}>
                  <p className={css.movie_title}>{movie.title || movie.name}</p>
                </div>
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
  if (status === 'rejected') {
    return <p>{error}</p>;
  }
}
