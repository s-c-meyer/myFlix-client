import "./movie-view.scss"
import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {
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
      <Button variant="primary" onClick={onBackClick}>Back</Button>
    </div>
  );
};