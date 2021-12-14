const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

function getErrorMsg(message, username) {
  if (message === "Not Found") {
    return `${username} doesn't exist`;
  }

  return message;
}

async function getProfile(username) {
  const res = await fetch(`https://api.github.com/users/${username}${params}`);
  const profile = res.json();

  if (profile.message) {
    throw new Error(getErrorMsg(profile.message, username));
  }

  return profile;
}

async function getRepos(username) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  );
  const repos = res.json();

  if (repos.message) {
    throw new Error(getErrorMsg(repos.message, username));
  }

  return repos;
}

function getStarCount(repos) {
  return repos.reduce(
    (stars, { stargazers_count }) => stars + stargazers_count,
    0
  );
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

async function getUserData(player) {
  const [profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player),
  ]);

  return {
    profile,
    score: calculateScore(profile.followers, repos),
  };
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export async function battle(players) {
  const results = await Promise.all([
    getUserData(players[0]),
    getUserData(players[1]),
  ]);

  return sortPlayers(results);
}

export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) throw new Error(data.message);

      return data.items;
    });
}
