import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const styles = {
  content: {
    fontSize: "2.1875rem",
    position: "absolute",
    left: 0,
    right: 0,
    marginTop: "20px",
    textAlign: "center",
  },
};

export default function Loading({ text = "Loading", speed = 300 }) {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const loadingInterval = window.setInterval(() => {
      content === text + "..." ? setContent(text) : setContent(content + ".");
    }, speed);
    return () => {
      window.clearInterval(loadingInterval);
    };
  });

  return <p style={styles.content}>{content}</p>;
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};
