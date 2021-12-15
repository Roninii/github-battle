import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { battle } from "../utils/api";
import Profile from "./Profile.jsx";
import Loading from "./Loading.jsx";

export default function Results(props) {
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const { playerOne, playerTwo } = props;

    try {
      setLoading(true);
      const [first, second] = await battle([playerOne, playerTwo]);

      setWinner(first);
      setLoser(second);
      setError(null);
      setLoading(false);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [props]);

  const isTie = winner?.score === loser?.score;

  if (loading) {
    return <Loading text="Battling" />;
  }

  if (error) {
    return <p className="center-text error">{error}</p>;
  }

  return (
    <>
      <div className="grid space-around container-sm">
        {winner && <Profile header={isTie ? "Tie" : "Winner"} user={winner} />}
        {loser && <Profile header={isTie ? "Tie" : "Loser"} user={loser} />}
      </div>
      <button className="btn btn-dark btn-space" onClick={props.onReset}>
        Reset
      </button>
    </>
  );
}

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
};
