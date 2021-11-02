import { getCommits, getRepos } from './http-request.js';

export const getRepoData = async (user) => {
  const repos = await getRepos(user);
  const res = await Promise.all(
    repos.map(async (item) => {
      const commits = await getCommits(item.commits_url.replace('{/sha}', ''));
      return {
        repoName: item.name,
        commits: commits.map((el) => el.commit.message),
      };
    })
  );
  return {
    user: user,
    repos: [...res],
  };
};
