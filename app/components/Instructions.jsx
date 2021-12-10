import React from "react";
import { FaUserFriends, FaFighterJet, FaTrophy } from "react-icons/fa";

export default function Instructions() {
  return (
    <div className="instructions-container">
      <h1 className="center-text header-lg">Instructions</h1>
      <ol className="container-sm grid center-text battle-instructions">
        <li>
          <h3 className="header-sm uppercase">Enter Two GitHub Users</h3>
          <FaUserFriends
            className="bg-light"
            color="hsl(264.7, 30%, 60%)"
            size={140}
          ></FaUserFriends>
        </li>
        <li>
          <h3 className="header-sm uppercase">Battle</h3>
          <FaFighterJet
            className="bg-light"
            color="#727272"
            size={140}
          ></FaFighterJet>
        </li>
        <li>
          <h3 className="header-sm uppercase">See The Winners</h3>
          <FaTrophy
            className="bg-light"
            color="rgb(255, 215, 0)"
            size={140}
          ></FaTrophy>
        </li>
      </ol>
    </div>
  );
}
