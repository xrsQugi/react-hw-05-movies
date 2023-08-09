import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';

export default function Movies() {
  const [query, setQuery] = useState('');

  return (
    <>
      <SearchBar onSubmit={query => setQuery(query)} />
      <MovieList movieQuery={query} />
    </>
  );
}