import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://moviesappmyflix-02f853986708.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user)); //store the user info in local storage
          localStorage.setItem("token", data.token); //store the authentication token in local storage 
          onLoggedIn(data.user, data.token); //pass the user data along with the token back to MainView to be used for all requests to the server
        } else {
          alert("No such user");
        }
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  };

  return (
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
      
      <Button className="my-3" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};