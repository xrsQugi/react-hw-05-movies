import { useState, useEffect } from 'react';
import fetchData from '../../API';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';
import Loader from 'components/Loader/Loader';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  const getReviews = async id => {
    setStatus('pending');
    try {
      const response = await fetchData(
        `/movie/${id}/reviews?`
      );
      setReviews(response.results);
      setStatus('resolved');
      setError('false');
    } catch (error) {
      setStatus('rejected');
      setError(error.message);
    }
  };

  useEffect(() => {
    getReviews(movieId);
  }, [movieId]);

  if (status === 'pending') {
    return (
      <div className={css.loading_block}>
        <Loader></Loader>
      </div>
    );
  }
  if (status === 'resolved') {
    if (reviews.length === 0) {
      return <p className={css.no_reviews}>No reviews available</p>;
    }
    return (
      <ul className={css.review_list}>
        {reviews.map(review => (
          <li className={css.review_item} key={review.id}>
            <h4 className={css.review_author}>{review.author}</h4>
            <p className={css.review_content}>{review.content}</p>
          </li>
        ))}
      </ul>
    );
  }
  if (status === 'rejected') {
    return <p>{error}</p>;
  }
}