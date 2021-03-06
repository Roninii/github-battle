import React from 'react';
import PropTypes from 'prop-types';
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { ThemeConsumer } from '../context/theme';

const Instructions = () => (
  <ThemeConsumer>
    {({ theme }) => (
      <div className="instructions-container">
        <h1 className="center-text header-lg" />
        <ol className="container-sm grid center-text battle-instructions">
          <li>
            <h3 className="header-sm">Enter two GitHub users</h3>
            <FaUserFriends className={`bg-${theme}`} color="rgb(255, 191, 116)" size={140} />
          </li>
          <li>
            <h3 className="header-sm">Battle</h3>
            <FaFighterJet className={`bg-${theme}`} color="#727272" size={140} />
          </li>
          <li>
            <h3 className="header-sm">See the winners</h3>
            <FaTrophy className={`bg-${theme}`} color="rgb(255, 215, 0)" size={140} />
          </li>
        </ol>
      </div>
    )}
  </ThemeConsumer>
);

class PlayerInput extends React.Component {
  state = {
    username: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.username);
  };

  handleChange = (event) => this.setState({ username: event.target.value });

  render() {
    const { username } = this.state;
    const { label } = this.props;

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form onSubmit={this.handleSubmit} className="column player">
            <label htmlFor="username" className="player-label">
              {label}
            </label>
            <div className="row player-inputs">
              <input
                type="text"
                id="username"
                className={`input-${theme}`}
                placeholder="github username"
                autoComplete="off"
                value={username}
                onChange={this.handleChange}
              />
              <button
                className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
                type="submit"
                disabled={!username}>
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    );
  }
}

const PlayerPreview = ({ username, onReset, label }) => (
  <ThemeConsumer>
    {({ theme }) => (
      <div className="column player">
        <h1 className="player-label">{label}</h1>
        <div className={`row bg-${theme}`}>
          <div className="player-info">
            <img
              src={`https://github.com/${username}.png?size=200`}
              alt={`avatar for ${username}`}
              className="avatar-small"
            />
            <a href={`https://github.com/${username}`} className="link">
              {username}
            </a>
          </div>
          <button className="btn-clear flex-center" onClick={onReset}>
            <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
          </button>
        </div>
      </div>
    )}
  </ThemeConsumer>
);

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default class Battle extends React.Component {
  state = {
    playerOne: null,
    playerTwo: null,
  };

  handleSubmit = (id, player) => {
    this.setState({
      [id]: player,
    });
  };

  handleReset = (id) => {
    this.setState({
      [id]: null,
    });
  };

  render() {
    const { playerOne, playerTwo } = this.state;

    return (
      <React.Fragment>
        <Instructions />

        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
            {playerOne === null ? (
              <PlayerInput
                label="Player One"
                onSubmit={(player) => this.handleSubmit('playerOne', player)}
              />
            ) : (
              <PlayerPreview
                username={playerOne}
                label="Player One"
                onReset={() => this.handleReset('playerOne')}
              />
            )}

            {playerTwo === null ? (
              <PlayerInput
                label="Player Two"
                onSubmit={(player) => this.handleSubmit('playerTwo', player)}
              />
            ) : (
              <PlayerPreview
                username={playerTwo}
                label="Player Two"
                onReset={() => this.handleReset('playerTwo')}
              />
            )}
          </div>

          {playerOne && playerTwo && (
            <Link
              className="btn btn-dark btn-space"
              to={{
                pathname: '/battle/results',
                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
              }}>
              Battle
            </Link>
          )}
        </div>
      </React.Fragment>
    );
  }
}
