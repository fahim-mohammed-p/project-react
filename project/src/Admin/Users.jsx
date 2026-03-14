import React, { useEffect, useState } from "react";
import "./Users.css"

import { FaBan } from "react-icons/fa";
import { CiBookmarkCheck } from "react-icons/ci";

function Users() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeStatus = (user) => {
    fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ banned: !user.banned }),
    })
      .then(() => {
        loadUsers();
      })
      .catch((err) => console.error(err));
  };

return (
    <div className="users-container">
  <h2 className="users-heading">Users List</h2>

  <div className="users-list">
    {users.map((user) => (
      <div className="user-card" key={user.id}>
        <p className="user-name">Name: {user.name}</p>
        <p className="user-status">Status: {user.banned ? "Banned" : "Active"}</p>
        <button
          className={`user-btn ${user.banned ? "unban-btn" : "ban-btn"}`}
          onClick={() => changeStatus(user)}
        >
          {user.banned ? (<><CiBookmarkCheck />Unban</>) : (<><FaBan />Ban</>)}
        </button>
      </div>
    ))}
  </div>
</div>
  );
}

export default Users;
