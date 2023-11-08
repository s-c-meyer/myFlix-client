import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";
import Col from "react-bootstrap/Col";



export const ProfileView = ({ user, movies, token, setUser }) => {
  const [username, setUsername] = useState(user.Username); //by putting the user.username into useState, you make the app use the current username of the signed in profile.
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = {
      Username: username,
      Email: email,
      Birthday: birthday,
    };
    if(password) {
      data['Password'] = password
    }

    fetch(`https://moviesappmyflix-02f853986708.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        alert("Profile Update Successful");
        window.location.reload();
        return response.json(); 
      } else { 
        alert("Profile Update Failed");
      }
    }).then((data) => { 
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      }
    })
  };

  const deleteProfile = () => {
    fetch(`https://moviesappmyflix-02f853986708.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        alert("Your profile has been successfully deleted");
      } else {
        alert("Something went wrong, profile has not been deleted")
      }
    })
  };




  //set the user's favorite movies to be passed to the MovieCard for display on the profile page
  let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));

  return (
    <>
      {/* display user information and allow for changes to it */}
      <Form className="m-1" onSubmit={handleSubmit}>
        <Form.Group className="mb-4" controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday.slice(0,10)}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="my-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {favoriteMovies.map((movie) => (
        <Col className="mb-4" key={movie.id} md={3}>
          <MovieCard movie={movie} />
        </Col>
      ))}

      <Button className="mt-5" variant="danger" onClick={deleteProfile}>
        Delete Your Account
      </Button>
    </>
  );
};
