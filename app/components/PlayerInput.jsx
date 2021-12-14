import React, { useState } from "react";
import PropTypes from "prop-types";

export default function PlayerInput({ onSubmit, label }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(username);
  };

  return (
    <form className="column player" onSubmit={handleSubmit}>
      <label htmlFor="username" className="player-label">
        {label}
      </label>
      <div className="row player-inputs">
        <input
          type="text"
          id="username"
          className="input-light"
          placeholder="github username"
          autoComplete="off"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button className="btn btn-dark" type="submit" disabled={!username}>
          Submit
        </button>
      </div>
    </form>
  );
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
