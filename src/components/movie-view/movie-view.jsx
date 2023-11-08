import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "./movie-view.scss"
import { useSelector } from "react-redux";

export const MovieView = ({ user, token, setUser }) => {
  const movies = useSelector((state) => state.movies.list); //get the movies from the store 
  const { movieId } = useParams(); //useParams is used to access the movieId URL param

  const movie = movies.find((m) => m.id === movieId);

   //set the user's favorite movies to be passed to the MovieCard for display on the profile page
   let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));

  const [isFavorite, setIsFavorite] = useState(
    favoriteMovies.includes(movies.id)
  );

  function favoriteMovie() {
    fetch(`https://moviesappmyflix-02f853986708.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
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
    fetch(`https://moviesappmyflix-02f853986708.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else { 
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
        <Button className="back-button">Back</Button>
      </Link>
      {isFavorite ? (
        <Button className="fav-button" onClick={unfavoriteMovie}>
          Unfavorite
        </Button>
      ) : (
        <Button className="fav-button" onClick={favoriteMovie}>
          Favorite
        </Button>
      )}
    </div>
  );
};