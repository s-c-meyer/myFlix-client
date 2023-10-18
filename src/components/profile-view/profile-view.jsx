import React from "react";
import Form from "react-bootstrap/Form";
import { useState, setState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";
import Col from "react-bootstrap/Col";



export const ProfileView = ({ user, movies, token, setUser }) => {

  // console.log(user);

  const [username, setUsername] = useState(user.Username); //by putting the user.username into useState, you make the app use the current username of the signed in profile.
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  //function used when the user attempts to change their username, below in the Form.Control
  // function handleUsernameChange(e) {
  //   setUsername({
  //     ...user,
  //     username: e.target.value
  //   });
  // }

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
        return response.json(); //update the information and send it back to me
      } else { //could write out error msgs for further errors. 403, 422, ... error msg built into fetch response
        alert("Profile Update Failed");
      }
    }).then((data) => { //update the local storage and user object with the new information 
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
      <Form className="m-2" onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
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

      {/* display favorite movies, BUT doesn't update until a logout */}
      {favoriteMovies.map((movie) => (
        <Col className="mb-4" key={movie.id} md={3}>
          <MovieCard movie={movie} />
        </Col>
      ))}

      <Button variant="danger" onClick={deleteProfile}>
        Delete Your Account
      </Button>
    </>


    //display all of the user's information
    // <div className="d-grid gap-3">
    //   <div>
    //     <span style={{ fontWeight: 'bold' }}>Username: </span>
    //     <span>{user.Username}</span>
    //   </div>
    //   <div>
    //     <span style={{ fontWeight: 'bold' }}>Password: </span>
    //     <span>{user.Password}</span>
    //   </div>
    //   <div>
    //     <span style={{ fontWeight: 'bold' }}>Email: </span>
    //     <span>{user.Email}</span>
    //   </div>
    //   <div>
    //     <span style={{ fontWeight: 'bold' }}>Birthday: </span>
    //     <span>{user.Birthday}</span>
    //   </div>
    //   <Link to={`/`}>
    //     <button className="back-button">Back</button>
    //   </Link>

      /* display favorite movies */
      // {favoriteMovies.map((movie) => (
      //   <Col className="mb-4" key={movie.id} md={3}>
      //     <MovieCard movie={movie} />
      //   </Col>
      // ))}

    //   <Form className="m-2" onSubmit={handleSubmit}>
    //     <Form.Group controlId="formUsername">
    //       <Form.Label>Username:</Form.Label>
    //       <Form.Control
    //         type="text"
    //         // value={username} //if this is user.Username it spells out the username and is not editable
    //         onChange={handleUsernameChange}
    //         // required
    //         minLength="3"
    //       />
    //     </Form.Group>
    //     <Button className="my-3" variant="primary" type="submit">
    //       Submit
    //     </Button>
    //   </Form>
    // </div>
  );
};
