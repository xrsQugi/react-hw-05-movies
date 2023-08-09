import { useParams, Outlet, NavLink, useLocation } from 'react-router-dom';
import fetchData from '../../API';
import { Suspense, useEffect, useState } from 'react';
import css from './MovieDetails.module.css';
import Loader from '../../components/Loader/Loader';
import defImg from '../../components/DefaultImg/DefaultImg';
import { BsReply } from 'react-icons/bs';

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const { movieId } = useParams();
  const location = useLocation();
  const goBackToMovies = location.state?.from ?? '/movies';

  const getMovies = async id => {
    setStatus('pending');
    try {
      const response = await fetchData(`/movie/${id}?`);
      setMovie(response);
      setStatus('resolved');
      setError(false);
    } catch (error) {
      setStatus('rejected');
      setError(error.message);
    }
  };

  useEffect(() => {
    getMovies(movieId);
  }, [movieId]);

  if (status === 'pending') {
    return (
      <div className={css.loading_block}>
        <Loader></Loader>
      </div>
    );
  }

  if (status === 'rejected') {
    return <p>{error}</p>;
  }

  if (status === 'resolved') {
    return (
      <div className={css.movie_details_container}>
        <NavLink className={css.btn_back} to={goBackToMovies}>
          <BsReply></BsReply>
          <span>Go back</span>
        </NavLink>
        <div className={css.movie_details_info}>
          <div className={css.poster_container}>
            <img
              className={css.poster}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defImg
              }
              alt=""
            />
          </div>
          <div className={css.movie_info}>
            <h2 className={css.movie_title}>{movie.title || movie.name}</h2>
            <p className={css.user_score}>
              User score: {Math.round(movie.vote_average)}/10
            </p>
            <div className={css.overview}>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
            <div className={css.genres}>
              <h3>Genres</h3>
              <p>
                {movie.genres.map(genre => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className={css.additional_info}>
          <p className={css.cast_reviews_title}>Additional information</p>
          <ul className={css.add_info_list}>
            <li>
              <NavLink className={css.nav_link} to="cast">
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink className={css.nav_link} to="reviews">
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
        <hr />
        <Suspense
          fallback={
            <div className={css.loading_block}>
              <Loader></Loader>
            </div>
          }movie dat
        >
          <Outlet />
        </Suspense>
      </div>
    );
  }
}
