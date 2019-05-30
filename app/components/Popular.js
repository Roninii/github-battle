import React from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';

import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';
import { fetchPopularRepos } from '../utils/api';

const LanguagesNav = ({ selected, onUpdateLanguage }) => {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="flex-center">
      {languages.map((lang, i) => {
        return (
          <li key={i}>
            <button
              className="btn-clear nav-link"
              onClick={() => onUpdateLanguage(lang)}
              style={lang === selected ? { color: 'rgb(187, 46, 31)' } : null}>
              {lang}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

const ReposGrid = ({ repos }) => (
  <ul className="grid space-around">
    {repos.map((repo, i) => {
      const { name, owner, html_url, stargazers_count, forks, open_issues } = repo;
      const { login, avatar_url } = owner;

      return (
        <li key={html_url}>
          <Card header={`#${i + 1}`} avatar={avatar_url} href={html_url} name={login}>
            <ul className="card-list">
              <li>
                <Tooltip text="Github username">
                  <FaUser color="rgb(255, 191, 116)" size={22} />
                  <a href={`https://github.com/${login}`}>{login}</a>
                </Tooltip>
              </li>
              <li>
                <FaStar color="rgb(255, 215, 0)" size={22} />
                {stargazers_count.toLocaleString()} stars
              </li>
              <li>
                <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                {forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color="rgb(241, 138, 147" size={22} />
                {open_issues.toLocaleString()} open issues
              </li>
            </ul>
          </Card>
        </li>
      );
    })}
  </ul>
);

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: {},
    error: null,
  };

  componentDidMount() {
    const { selectedLanguage } = this.state;
    this.updateLanguage(selectedLanguage);
  }

  updateLanguage = (selectedLanguage) => {
    const { repos } = this.state;

    this.setState({
      selectedLanguage,
      error: null,
    });

    if (!repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) =>
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data,
            },
            error: null,
          })),
        )
        .catch(() => {
          console.warn('Error fetching repos: ', error);

          this.setState({
            error: 'There was an error fetching the repositories',
          });
        });
    }
  };

  isLoading = () => {
    const { selectedLanguage, repos, error } = this.state;

    return !repos[selectedLanguage] && !error;
  };

  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <>
        <LanguagesNav selected={selectedLanguage} onUpdateLanguage={this.updateLanguage} />

        {this.isLoading() && <Loading text="Fetching repos" />}

        {error && <p className="center-text error">{erorr}</p>}

        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </>
    );
  }
}
