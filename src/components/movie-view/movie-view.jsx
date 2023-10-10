import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss"

export const MovieView = ({ movies }) => {
  const { movieId } = useParams(); //useParams is used to access the movieId URL param

  const movie = movies.find((m) => m.id === movieId);

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
    </div>
  );
};