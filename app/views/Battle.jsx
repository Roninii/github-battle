import React, { useState } from "react";
import Instructions from "../components/Instructions.jsx";
import PlayerInput from "../components/PlayerInput.jsx";
import PlayerPreview from "../components/PlayerPreview.jsx";
import Results from "../components/Results.jsx";

export default function Battle() {
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);
  const [battle, setBattle] = useState(false);

  const resetBattle = () => {
    setPlayerOne(null);
    setPlayerTwo(null);
    setBattle(false);
  };

  return battle ? (
    <Results
      playerOne={playerOne}
      playerTwo={playerTwo}
      onReset={resetBattle}
    />
  ) : (
    <>
      <Instructions />
      <section className="players-container">
        <h1 className="center-text header-lg">Players</h1>
        <div className="row space-around">
          {playerOne === null ? (
            <PlayerInput
              onSubmit={(player) => {
                setPlayerOne(player);
              }}
              label={`Player One`}
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              label="Player One"
              onReset={() => {
                setPlayerOne(null);
              }}
            />
          )}
          {playerTwo === null ? (
            <PlayerInput
              onSubmit={(player) => {
                setPlayerTwo(player);
              }}
              label={`Player Two`}
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              label="Player Two"
              onReset={() => {
                setPlayerTwo(null);
              }}
            />
          )}
        </div>

        {playerOne && playerTwo && (
          <button
            className="btn btn-dark btn-space"
            onClick={() => {
              setBattle(true);
            }}
          >
            Battle
          </button>
        )}
      </section>
    </>
  );
}
