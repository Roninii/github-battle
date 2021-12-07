import React from "react";

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All",
    };
  }

  updateSelectedLanguage = (language) => {
    this.setState({
      selectedLanguage: language,
    });
  };

  render() {
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
    return (
      <ul className="flex-center">
        {languages.map((language) => (
          <li
            key={language}
            style={{
              color:
                this.state.selectedLanguage === language
                  ? "hsl(264.7, 100%, 46.7%)"
                  : "",
            }}
          >
            <button
              className="btn-clear nav-link"
              onClick={() => this.updateSelectedLanguage(language)}
            >
              {language}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
