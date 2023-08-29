import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  /* by setting the initial state of this variable to null, 
  this tells the app that no movie cards are currently clicked. 
  Then when you click on one, you have to update the MainView to
  reflect that one of the movies has been clicked */
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://moviesappmyflix-02f853986708.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            image: doc.ImagePath,
            description: doc.Description,
            director: doc.Director.Name,
            genre: doc.Genre.Name,
            runtime: doc.RuntimeMins + ' minutes'
          };
        });

        setMovies(moviesFromApi);
        });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie} //movie is a prop being created
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  }
};