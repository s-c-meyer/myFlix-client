import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./movie-view.scss"

export const MovieView = ({ movies, user }) => {
  const { movieId } = useParams(); //useParams is used to access the movieId URL param

  const movie = movies.find((m) => m.id === movieId);

  function favoriteMovie() {
    console.log(movieId);
    console.log(user.Username);
    const url = "https://moviesappmyflix-02f853986708.herokuapp.com/users/" + user.Username + "/movies/" + movieId; 
    console.log(url);
    fetch(url, {
      headers: { Authorization: `Bearer ${token}`}
    })
  }

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
      <Button onClick={favoriteMovie}>
        Favorite this Movie!
      </Button>
    </div>
  );
};