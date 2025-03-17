import BASE_URL from "../consts/base-url";

export async function fetchUserData(username: string) {
  const userResponse = await fetch(`${BASE_URL}/users/${username}`);

  if (!userResponse.ok) {
    throw new Error(`GitHub API error: ${userResponse.status}`);
  }
  return await userResponse.json();
}

export async function fetchRepositories(username: string, currentPage: number) {
  
  const reposResponse = await fetch(
    `${BASE_URL}/users/${username}/repos?per_page=10&page=${currentPage}`
  );

  if (!reposResponse.ok) {
    throw new Error(`GitHub API error: ${reposResponse.status}`);
  }
  return await reposResponse.json();
}
