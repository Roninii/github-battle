import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaUsers, FaCompass, FaBriefcase, FaUserFriends, FaCode, FaUser } from 'react-icons/fa';
import queryString from 'query-string';

import { battle } from '../utils/api';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';

const ProfileList = ({ profile }) => (
  <ul className="card-list">
    <li>
      <FaUser color="rgb(239, 115, 115)" size={22} />
      {profile.name}
    </li>
    {profile.location && (
      <li>
        <Tooltip text="User's location">
          <FaCompass color="rgb(144, 116, 255)" size={22} />
          {profile.location}
        </Tooltip>
      </li>
    )}
    {profile.company && (
      <li>
        <Tooltip text="User's company">
          <FaBriefcase color="#795548" size={22} />
          {profile.company}
        </Tooltip>
      </li>
    )}
    <li>
      <FaUsers color="rgb(129, 195, 245)" size={22} />
      {profile.followers.toLocaleString()} followers
    </li>
    <li>
      <FaUserFriends color="rgb(64, 183, 95)" size={22} />
      {profile.following.toLocaleString()} following
    </li>
  </ul>
);

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    const { location } = this.props;
    const { playerOne, playerTwo } = queryString.parse(location.search);
    try {
      const players = await battle([playerOne, playerTwo]);
      this.setState({
        winner: players[0],
        loser: players[1],
        error: null,
        loading: false,
      });
    } catch ({ message }) {
      this.setState({
        error: message,
        loading: false,
      });
    }
  }

  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading === true) return <Loading />;

    if (error) return <p className="center-text error">{error}</p>;

    return (
      <React.Fragment>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}>
            <ProfileList profile={winner.profile} />
          </Card>

          <Card
            header={winner.score === loser.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            href={loser.profile.html_url}
            name={loser.profile.login}>
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <Link className="btn btn-dark btn-space" to="/battle">
          Reset
        </Link>
      </React.Fragment>
    );
  }
}
