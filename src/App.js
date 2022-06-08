import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  // State updating function || Loading data | Handling errors
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Using useCallback so fetchMoviesHandler function is not recreated unnecessarily
  const fetchMoviesHandler = useCallback(async () => {
    // When handler is called, sets the loading to true and error to null
    setIsLoading(true);
    setError(null);
    try {
      // Fetch the API
      const response = await fetch(
        "https://react-http-cd176-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
      );

      // Check if the response was successful
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      // Formatting the response
      const data = await response.json();

      // Array empty - will be filled by objects
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      // Set movies state to the transformed data
      setMovies(loadedMovies);

      // In case it catches an error it sets error state with the message above (new Error)
    } catch (error) {
      setError(error.message);
    }
    // After the process, want to set loading to false
    setIsLoading(false);
  }, []);

  // Using useEffect so the function is called when the component is first rendered
  // also when the dependency change
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  // Add movie handler to send a POST request - by default is GET, can add second argument and change the method, add the content and define headers
  // the content has to be json, therefore using JSON object and call stringify
  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-http-cd176-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
