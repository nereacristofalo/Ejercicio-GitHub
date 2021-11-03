import fetch from 'node-fetch';

export const getRepos = async (user) => {
  return await (
    await fetch(`https://api.github.com/users/${user}/repos`, {
      headers: {
        Authorization: 'Bearer ',
      },
    })
  ).json();
};

export const getData = async (url) => {
  return await (
    await fetch(url, {
      headers: {
        Authorization: 'Bearer ',
      },
    })
  ).json();
};
