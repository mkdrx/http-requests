import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // State updating function
  const [movies, setMovies] = useState([]);

  // State for loading data
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    // When handler is called, sets the loading to true
    setIsLoading(true);

    // As a string the request - its a promise accessed by then() when a response (object) is given
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });

    setMovies(transformedMovies);

    // After the process, want to set loading to false
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* Conditional to output movies based if not loading and we have movies*/}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        <MoviesList movies={movies} />
        {/* Conditional if not loading and there are not movies */}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
