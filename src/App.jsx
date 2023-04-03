import { useEffect, useState } from "react";
import Movie from "./components/MovieCard/MovieCard";
import SearchBar from "./components/SearchBar/SearchBar";
import Loading from "./components/Loading/Loading";
import MovieCard from "./components/MovieCard/MovieCard";

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  // fetch function
  async function searchMovies(query) {
    const queryURL = searchUrl + apiKey + "&query=";
    const res = await fetch(queryURL + query);
    const data = await res.json();

    setMovies(data.results);

    console.log(data.results);
  }

  // useEffect(() => {
  //   searchMovies("star");
  // }, []);

  function handleSubmit(e) {
    e.preventDefault();
    searchMovies(query);
  }

  function handleUpdateQuery(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="App">
      <SearchBar
        handleSubmit={handleSubmit}
        handleUpdateQuery={handleUpdateQuery}
        value={query}
      />
      {isLoading && <Loading />}
      <div className="movies-container">
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}

export default App;
