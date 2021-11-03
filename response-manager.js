import { getData, getRepos } from './http-request.js';

export const getRepoData = async (user) => {
  const repos = await getRepos(user);
  const res = await Promise.all(
    repos.map(async (item) => {
      const files = {};
      const commits = await getData(item.commits_url.replace('{/sha}', ''));
      await getContent(item.contents_url.replace('{+path}', ''), files);
      return {
        repoName: item.name,
        commits: Array.isArray(commits)
          ? commits.map((el) => el.commit.message)
          : null,
        files,
      };
    })
  );
  return {
    user: user,
    repos: [...res],
  };
};

const getContent = async (url, files) => {
  const contents = await getData(url);
  if (!Array.isArray(contents)) return;

  for (const content of contents) {
    // SI INCLUYE UN '.' SE QUE ES UN ARCHIVO Y TENGO QUE CONTABILIZARLO
    if (content.name.includes('.')) {
      const c = content.name.split('.');
      const fileExtension = c[c.length - 1];
      if ([fileExtension] in files) {
        files[fileExtension]++;
      } else {
        files[fileExtension] = 1;
      }
    } else {
      await getContent(content.url, files);
    }
  }
};
