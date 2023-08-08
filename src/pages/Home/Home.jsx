import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import fetchInfo from '../../API';
import css from './Home.module.css';
import Loader from '../../components/Loader/Loader'

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const location = useLocation();

  const getMovies = async () => {
    setStatus('pending');
    try {
      const response = await fetchInfo(
        '/trending/movie/day?'
      );
      setMovies(response.results);
      setStatus('resolved');
      setError(false);
    } catch (error) {
      setStatus('rejected');
      setError(error.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (status === 'pending') {
    return (
      <div className={css.loading_block}>
        <Loader></Loader>
      </div>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <h3 className={css.home_title}>Trending today</h3>
        <ul className={css.movie_list}>
          {movies.map(movie => (
            <li key={movie.id}>
              <NavLink
                className={css.nav_link}
                to={`movies/${movie.id}`}
                state={{ from: location }}
              >
                {movie.title || movie.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (status === 'rejected') {
    return <p>{error}</p>;
  }
}
