import React from "react";
import PropTypes from "prop-types";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function Repo({
  i,
  html_url,
  avatar_url,
  username,
  name,
  stargazers_count,
  forks,
  open_issues,
}) {
  return (
    <li key={html_url} className="repo bg-light">
      <h4 className="header-lg center-text">#{i + 1}</h4>
      <img src={avatar_url} alt={`Avatar for ${username}`} className="avatar" />
      <h2 className="center-text">
        <a href={html_url} className="link">
          {username}
        </a>
      </h2>

      <ul class="card-list">
        <li>
          <FaUser color="rgb(255, 191, 116)" size={22} />
          <a href={`https://github.com/${username}`}>{username}</a>
        </li>
        <li>
          <FaStar color="rgb(255, 215, 0" size={22} />
          {stargazers_count.toLocaleString()} stars
        </li>
        <li>
          <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
          {forks}
        </li>
        <li>
          <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
          {open_issues.toLocaleString()} open issues
        </li>
      </ul>
    </li>
  );
}

Repo.propTypes = {
  i: PropTypes.number.isRequired,
  html_url: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stargazers_count: PropTypes.string.isRequired,
  forks: PropTypes.string.isRequired,
  open_issues: PropTypes.string.isRequired,
};
