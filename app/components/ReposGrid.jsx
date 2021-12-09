import React from "react";
import PropTypes from "prop-types";
import Repo from "./Repo.jsx";

export default function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map(
        (
          {
            name,
            owner: { login: username, avatar_url },
            html_url,
            stargazers_count,
            forks,
            open_issues,
          },
          i
        ) => (
          <Repo
            i={i}
            name={name}
            username={username}
            avatar_url={avatar_url}
            html_url={html_url}
            stargazers_count={stargazers_count}
            forks={forks}
            open_issues={open_issues}
          />
        )
      )}
      <li></li>
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
