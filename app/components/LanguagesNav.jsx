import React, { useState } from "react";
import PropTypes from "prop-types";

export default function LanguagesNav({ selected, updateSelectedLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li
          key={language}
          style={{
            color: selected === language ? "hsl(264.7, 100%, 46.7%)" : "",
          }}
        >
          <button
            className="btn-clear nav-link"
            onClick={() => updateSelectedLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  updateSelectedLanguage: PropTypes.func.isRequired,
};
