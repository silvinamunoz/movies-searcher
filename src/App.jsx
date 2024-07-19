import { useState } from 'react';
import './App.css';
import { useMovies } from './hooks/useMovies';
import useSearch from './hooks/useSearch';
import debounce from 'just-debounce-it';
import { useCallback } from 'react';

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies(search, sort);
  const hasMovies = movies?.length > 0;

  // const debouncedGetMovies = useCallback(
  //   debounce(() => {
  //     getMovies();
  //   }, 2000),
  //   [getMovies]
  // );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  }

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    // debouncedGetMovies();
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <label>
            Sort by title
            <input type='checkbox' onChange={() => setSort(!sort)} />
          </label>
          <input name="query" value={search} onChange={handleChange} placeholder='Avengers, Star wars...' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p className='error-text'>{error}</p>}
      </header>
      <main>
        {loading && <p>Loading...</p>}
        <ul className='movies'>
          {
            hasMovies ?
              movies?.map((movie, index) => (
                <li className='movie' key={index}>
                  <h3>{movie.title}</h3>
                  <p>{movie.year}</p>
                  <img src={movie.poster} alt={movie.title} />
                </li>
              ))
              : "No se encontraron resultados"
          }
        </ul>
      </main>
    </div>
  )
}

export default App;
