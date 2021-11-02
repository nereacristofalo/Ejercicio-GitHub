import fetch from 'node-fetch';

export const getRepos = async (user) => {
  return await (
    await fetch(`https://api.github.com/users/${user}/repos`, {
      headers: {
        Authorization: 'Bearer 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',
      },
    })
  ).json();
};

export const getCommits = async (url) => {
  return await (
    await fetch(url, {
      headers: {
        Authorization: 'Bearer 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',
      },
    })
  ).json();
};
