import React from "react";
import PropTypes from "prop-types";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUser,
  FaUserFriends,
  FaCode,
} from "react-icons/fa";
import Card from "./Card.jsx";

export default function Profile({ header, user }) {
  return (
    <Card
      header={header}
      subheader={`Score: ${user.score.toLocaleString()}`}
      avatar={user.profile.avatar_url}
      href={user.profile.html_url}
      name={user.profile.login}
    >
      <ul className="card-list">
        <li>
          <FaUser color="rgb(255, 191, 116)" size={22} />
          {user.profile.name}
        </li>
        {user.profile.location && (
          <li>
            <FaCompass color="rgb(144, 116, 255)" size={22} />
            {user.profile.location}
          </li>
        )}
        {user.profile.company && (
          <li>
            <FaBriefcase color="#795548" size={22} />
            {user.profile.company}
          </li>
        )}
        <li>
          <FaUsers color="rgb(129, 195, 245)" size={22} />
          {user.profile.followers.toLocaleString()} followers
        </li>
        <li>
          <FaUserFriends color="rgb(64, 183, 95)" size={22} />
          {user.profile.following.toLocaleString()} following
        </li>
      </ul>
    </Card>
  );
}

Profile.propTypes = {
  header: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};
