import { useEffect, useState } from 'react';
import fetchUsers from '../../API';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';
import Loader from 'components/Loader/Loader';
import defImg from 'components/DefaultImg/DefaultImg';

export default function Cast() {
  const [status, setStatus] = useState('idle');
  const [actors, setActors] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  const getActors = async id => {
    setStatus('pending');
    try {
      const response = await fetchUsers(`/movie/${id}/credits?`);
      setActors(response.cast);
      setStatus('resolved');
      setError('false');
    } catch (error) {
      setStatus('rejected');
      setError(error.message);
    }
  };
  useEffect(() => {
    getActors(movieId);
  }, [movieId]);

  if (status === 'pending') {
    return (
      <div className={css.loading_block}>
        <Loader></Loader>
      </div>
    );
  }
  if (status === 'resolved') {
    return (
      <ul className={css.actors_list}>
        {actors.map(actor => (
          <li key={actor.id} className={css.actor_info}>
            {
              <img
                className={css.actor_img}
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}?api_key=ee0ed139d0a1d8fcbabd26e40efda78c` : defImg}
                alt={actor.name}
              />
            }
            <div className={css.actor_info_text}>
              <p className={css.actor_name}>{actor.name}</p>
              <p className={css.actor_character}>Character: {actor.character || 'No info available'}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  if (status === 'rejected') {
    return <p className={css.error_text}>{error}</p>;
  }
}
