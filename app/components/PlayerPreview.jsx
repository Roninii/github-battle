import React from "react";
import PropTypes from "prop-types";
import { FaTimesCircle } from "react-icons/fa";

export default function PlayerPreview({ username, onReset, label }) {
  return (
    <div className="column player">
      <h3 className="player-label">{label}</h3>
      <div className="row bg-light">
        <div className="player-info">
          <img
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
            className="avatar-sm"
          />
          <a
            href={`https://github.com/${username}`}
            className="link"
            rel="noreferrer noopener"
            target="_blank"
          >
            {username}
          </a>
        </div>
        <button className="btn-clear flex-center" onClick={onReset}>
          <FaTimesCircle color="hsl(264.7 70% 46.7%)" size={26} />
        </button>
      </div>
    </div>
  );
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
