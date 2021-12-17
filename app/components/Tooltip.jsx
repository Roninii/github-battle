import React, { useState } from "react";
import PropTypes from "prop-types";
import Hover from "./Hover.jsx";

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = {
  container: {
    position: "relative",
    display: "flex",
  },
  tooltip: {
    boxSizing: "border-box",
    position: "absolute",
    width: "160px",
    bottom: "100%",
    left: "50%",
    marginLeft: "-80px",
    borderRadius: "3px",
    backgroundColor: "hsl(0 0% 20% / 0.9)",
    padding: "7px",
    marginBottom: "5px",
    color: "hsl(0 50% 100%)",
    textAlign: "center",
    fontSize: "0.875rem",
  },
};

export default function Tooltip({ text, children }) {
  return (
    <Hover>
      {(hovering) => (
        <div style={styles.container}>
          {hovering && <p style={styles.tooltip}>{text}</p>}
          {children}
        </div>
      )}
    </Hover>
  );
}
