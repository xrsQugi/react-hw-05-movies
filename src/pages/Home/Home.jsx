import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import fetchInfo from '../../API';
import css from './Home.module.css';
import Loader from '../../components/Loader/Loader';
import defImg from '../../components/DefaultImg/DefaultImg'

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const location = useLocation();

  const getMovies = async () => {
    setStatus('pending');
    try {
      const response = await fetchInfo('/trending/all/day?');
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
      <div className={css.home_container}>
        <h3 className={css.home_title}>Trending today</h3>
        <ul className={css.movie_list}>
          {movies.map(movie => (
            <li key={movie.id}>
              <NavLink
                className={css.nav_link}
                to={`movies/${movie.id}`}
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
      </div>
    );
  }

  if (status === 'rejected') {
    return <p>{error}</p>;
  }
}
