import { useSearchParams } from 'react-router-dom';
import css from './SearchBar.module.css';
import { BsSearch } from "react-icons/bs";

export default function SearchBar({ onSubmit }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // if (query.trim() === '') {
    //   return;
    // }
    onSubmit(query);
  };

  return (
    <form onSubmit={handleFormSubmit} className={css.form}>
      <input
        type="text"
        onChange={e =>
          setSearchParams(
            e.currentTarget.value !== '' ? { query: e.currentTarget.value } : {}
          )
        }
        required
        autoFocus
        className={css.input}
      />
      <button type="submit" className={css.btn_submit}><BsSearch></BsSearch></button>
    </form>
  );
}
