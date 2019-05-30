const id = '44a37f15e83ffa3e0123';
const sec = '155ba820675f28e557009f36db21f2ee45a2e9fd';
const params = `?client_id=${id}&client_secret=${sec}`;

const getErrorMsg = (message, username) => {
  if (message === 'Not Found') {
    return `${username} doesn't exist`;
  }

  return message;
};

const getProfile = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}${params}`);
  const profile = await response.json();

  if (profile.message) throw new Error(getErrorMsg(profile.message, username));
  return profile;
};

const getRepos = async (username) => {
  const res = await fetch(`https://api.github.com/users/${username}/repos${params}`);
  const repos = await res.json();

  if (repos.message) throw new Error(getErrorMsg(repos.message, username));
  return repos;
};

const getStarCount = (repos) =>
  repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0);

const calculateScore = (followers, repos) => followers * 3 + getStarCount(repos);

const getUserData = async (player) => {
  const [profile, repos] = await Promise.all([getProfile(player), getRepos(player)]);
  return {
    profile,
    score: calculateScore(profile.followers, repos),
  };
};

const sortPlayers = (players) => players.sort((a, b) => b.score - a.score);

const battle = async (players) => {
  const results = await Promise.all([getUserData(players[0]), getUserData(players[1])]);
  return sortPlayers(results);
};

const fetchPopularRepos = async (language) => {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`,
  );

  const res = await fetch(endpoint);
  const data = await res.json();

  if (!data.items) throw new Error(data.message);

  return data.items;
};

export { fetchPopularRepos, battle };
