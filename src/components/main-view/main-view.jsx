import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser: null);
  const [token, setToken] = useState(storedToken? storedToken: null);
  const [movies, setMovies] = useState([]); //this hook has to be grouped with these ones above it, it throws an error when it is further down in the code

   /* by setting the initial state of this variable to null, 
  this tells the app that no movie cards are currently clicked. 
  Then when you click on one, you have to update the MainView to
  reflect that one of the movies has been clicked */
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://moviesappmyflix-02f853986708.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
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
  }, [token]); //token must be added here, known as the dependency array. It ensures fetch is called every time token changes

  //if there is no one logged in, display the login screen / signup screen
  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        OR
        <SignupView />
      </>
    );
  }

  //if there is no one logged in, display the login screen
  // if (!user) {
  //   return (
  //     <>
  //       <LoginView
  //         onLoggedIn={(user, token) => {
  //           setUser(user);
  //           setToken(token);
  //         }}
  //       />
  //       OR
  //       <SignupView />
  //     </>
  //   );
  // }
  
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://moviesappmyflix-02f853986708.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
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
  }, [token]); //token must be added here, known as the dependency array. It ensures fetch is called every time token changes

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        OR
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <>
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
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button> 
      </>
    );
  }
};