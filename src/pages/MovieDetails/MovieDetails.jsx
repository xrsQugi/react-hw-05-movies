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
      <main className="movieDetailsContainer">
        <NavLink className={css.goBackBtn} to={goBackToMovies}>
          <BsReply></BsReply>
          <span>Go back</span>
        </NavLink>
        <div className={css.movieDetails}>
          <div className={css.posterBox}>
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
          <div className={css.movieInfo}>
            <h2 className={css.movieTitle}>{movie.title || movie.name}</h2>
            <p className={css.score}>
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
                  <span key={genre.id}>{genre.name}, </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className={css.additionaInfo}>
          <p className={css.castAndReviewsTitle}>Additional information</p>
          <ul>
            <li>
              <NavLink className={css.navLink} to="cast">
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink className={css.navLink} to="reviews">
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
        <Suspense
          fallback={
            <div className={css.loading_block}>
              <Loader></Loader>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    );
  }
}
