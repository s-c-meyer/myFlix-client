export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div 
      onClick={() => {
        onMovieClick(movie); //here, movie is the prop extracted above
      }}
    >
      {movie.title}
    </div>
  );
};