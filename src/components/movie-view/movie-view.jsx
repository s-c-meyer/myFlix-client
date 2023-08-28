export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img alt="Movie Cover" src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Runtime: </span>
        <span>{movie.runtime}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};