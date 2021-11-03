import fetch from 'node-fetch';
import { readFile } from 'fs/promises';
const config = JSON.parse(
  await readFile(new URL('./config.json', import.meta.url))
);

export const getRepos = async (user) => {
  return await (
    await fetch(`https://api.github.com/users/${user}/repos`, {
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    })
  ).json();
};

export const getData = async (url) => {
  return await (
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    })
  ).json();
};
