import React, { useEffect } from "react";
import { battle } from "../utils/api";

export default function Results(props) {
  useEffect(async () => {
    const { playerOne, playerTwo } = props;

    const players = await battle([playerOne, playerTwo]);
    console.log(players);
  }, [props]);
  return (
    <div>
      Results
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}
