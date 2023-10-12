import React from "react";
import Form from "react-bootstrap/Form";
import { useState, setState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";
import Col from "react-bootstrap/Col";



export const ProfileView = ({ user, movies, token }) => {

  const [username, updateUsername] = useState({
    username: user.Username //place password, email, and bday here as well
  });

  //function used when the user attempts to change their username, below in the Form.Control
  function handleUsernameChange(e) {
    updateUsername({
      ...user,
      username: e.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
    };

    const url = "https://moviesappmyflix-02f853986708.herokuapp.com/users/" + user.Username;

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}` //still says unauthorized error 401?
      }
    }).then((response) => {
      if (response.ok) {
        alert("Profile Update Successful");
        window.location.reload();
      } else {
        alert("Profile Update Failed");
      }
    });
  };

  //set the user's favorite movies to be passed to the MovieCard for display on the profile page
  let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));

  return (
    <div className="d-grid gap-3">
      <div>
        <span style={{ fontWeight: 'bold' }}>Username: </span>
        <span>{user.Username}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Password: </span>
        <span>{user.Password}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Email: </span>
        <span>{user.Email}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Birthday: </span>
        <span>{user.Birthday}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>

      {/* display favorite movies */}
      {favoriteMovies.map((movie) => (
        <Col className="mb-4" key={movie.id} md={3}>
          <MovieCard movie={movie} />
        </Col>
      ))}

      <Form className="m-2" onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            // value={username} //if this is user.Username it spells out the username and is not editable
            onChange={handleUsernameChange}
            // required
            minLength="3"
          />
        </Form.Group>
        <Button className="my-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
