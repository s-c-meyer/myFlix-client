import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "./movie-view.scss"

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams(); //useParams is used to access the movieId URL param

  const movie = movies.find((m) => m.id === movieId);

   //set the user's favorite movies to be passed to the MovieCard for display on the profile page
   let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));

  const [isFavorite, setIsFavorite] = useState(
    favoriteMovies.includes(movies.id)
  );

  // let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));
  // console.log(favoriteMovies.length);
  // console.log(favoriteMovies);

  // const isIdContained = favoriteMovies.some(id => id.includes(movieId));
  // console.log(isIdContained);

  function favoriteMovie() {
    // console.log(movieId);
    // console.log(user.Username);
    // const url = "https://moviesappmyflix-02f853986708.herokuapp.com/users/" + user.Username + "/movies/" + movieId; 
    // console.log(url);
    fetch(`https://moviesappmyflix-02f853986708.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}` //still says 422?
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
        // alert("Movie Favorited Successfully!");
        // window.location.reload();
      } else { //could write out error msgs for further errors. 403, 422, ... error msg built into fetch response
        alert("Something went wrong");
        return false;
      }
    }).then((user) => {
      if (user) {
        alert("Successfuly added to favs")
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsFavorite(true);
        console.log(isFavorite);
      }
    });
  };

  const unfavoriteMovie = () => {
    // console.log(movieId);
    // console.log(user.Username);
    // const url = "https://moviesappmyflix-02f853986708.herokuapp.com/users/" + user.Username + "/movies/" + movieId; 
    // console.log(url);
    fetch(`https://moviesappmyflix-02f853986708.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        // alert("Movie Unfavorited Successfully!");
        // console.log(isFavorite);
        // window.location.reload();
        return response.json();
      } else { //could write out error msgs for further errors. 403, 422, ... error msg built into fetch response
        alert("Something went wrong");
        return false;
      }
    }).then((user) => {
      if (user) {
        alert("Successfully removed from favs!")
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsFavorite(false);
        console.log(isFavorite);
      }
    });
  };
    
  return (
    <div className="d-grid gap-3">
      <div>
        <img className="rounded-5" src={movie.image} />
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Runtime: </span>
        <span>{movie.runtime}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
      {isFavorite ? (
        <Button onClick={unfavoriteMovie}>
          Unfavorite
        </Button>
      ) : (
        <Button onClick={favoriteMovie}>
          Favorite
        </Button>
      )}
      {/* <Button onClick={favoriteMovie}>
        Favorite this Movie!
      </Button> */}
    </div>
  );
};