import React, { useEffect, useState } from "react";
import { battle } from "../utils/api";
import Profile from "./Profile.jsx";

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
    return <p>LOADING</p>;
  }

  if (error) {
    return <p className="center-text error">{error}</p>;
  }

  return (
    <div className="grid space-around container-sm">
      {winner && <Profile isTie={isTie} user={winner} />}
      {loser && <Profile isTie={isTie} user={loser} />}
    </div>
  );
}
