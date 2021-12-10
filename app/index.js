import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Popular from "./views/Popular.jsx";
import Battle from "./views/Battle.jsx";
class App extends React.Component {
  render() {
    return (
      <div className="container">
        {/* <Popular /> */}
        <Battle />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
