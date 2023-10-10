import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const ProfileView = ({ user }) => {
  const { userUsername } = useParams();

  const user = user.find((u) => u.id === userUsername);

  return (
    <div className="d-grid gap-3">
      <div>
        <span style={{ fontWeight: 'bold' }}>Username: </span>
        <span>{user.username}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Password: </span>
        <span>{user.password}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Email: </span>
        <span>{user.email}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Birthday: </span>
        <span>{user.birthday}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
