import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // State updating function || Loading data | Handling errors
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    // When handler is called, sets the loading to true and error to null
    setIsLoading(true);
    setError(null);
    try {
      // Fetch the API
      const response = await fetch("https://swapi.dev/api/films/");

      // Check if the response was successful
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      // Formatting the response
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      // Set movies state to the transformed data
      setMovies(transformedMovies);

      // In case it catches an error it sets error state with the message above (new Error)
    } catch (error) {
      setError(error.message);
    }
    // After the process, want to set loading to false
    setIsLoading(false);
  }

  // Conditionals output - based on state

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>Something went wrong!</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
