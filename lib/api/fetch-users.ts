import BASE_URL from "../consts/base-url";

async function fetchUsers(searchTerm: string, currentPage: number) {
  const response = await fetch(
    `${BASE_URL}/search/users?q=${searchTerm}&per_page=10&page=${currentPage}`
  );

  if (!response.ok) {
    throw new Error(`GitHub API error when fetching users: ${response.status}`);
  }

  return await response.json();
}

export default fetchUsers;
