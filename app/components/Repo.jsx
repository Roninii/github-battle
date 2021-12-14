import React from "react";
import PropTypes from "prop-types";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";
import Card from "./Card.jsx";

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
    <li key={html_url}>
      <Card
        header={`#${i + 1}`}
        avatar={avatar_url}
        name={username}
        href={html_url}
      >
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
      </Card>
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
