import React, { useState, useEffect } from "react";
import { fetchPopularRepos } from "../utils/api";
import LanguagesNav from "../components/LanguagesNav.jsx";
import ReposGrid from "../components/ReposGrid.jsx";
import Loading from "../components/Loading.jsx";

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [repos, setRepos] = useState({});
  const [error, setError] = useState(null);

  const isLoading = () => !repos[selectedLanguage] && error === null;

  const updateSelectedLanguage = async (language) => {
    setSelectedLanguage(language);
    setError(null);
  };

  useEffect(() => {
    if (!repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => setRepos({ ...repos, [selectedLanguage]: data }))
        .catch((e) => {
          console.error(`Error fetching repos: ${e}`);
          setError(`There was an error fething the repositories.`);
        });
    }
  }, [selectedLanguage]);

  return (
    <>
      <LanguagesNav
        selected={selectedLanguage}
        updateSelectedLanguage={updateSelectedLanguage}
      />

      {isLoading() && <Loading text="Fetching Repos" />}
      {error && <p className="center-text error">{error}</p>}
      {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
    </>
  );
}
