import { useGitHub } from "@/context/github-context";
import { fetchRepositories, fetchUserData } from "@/lib/api/fetch-repositories";
import { useEffect } from "react";

export default function useFetchRepositories(username: string) {
  const { state, dispatch } = useGitHub();

  // Reset pagination when username changes
  useEffect(() => {
    dispatch({ type: "SET_REPOS_PAGE", payload: 1 });
  }, [username, dispatch]);

  useEffect(() => {
    async function getRepositories() {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        // First get total count of repositories
        const userData = await fetchUserData(username);
        const totalRepos = userData.public_repos || 0;

        // Then fetch the repositories
        const reposData = await fetchRepositories(
          username,
          state.reposPagination.currentPage
        );

        dispatch({
          type: "SET_REPOSITORIES",
          payload: {
            repositories: reposData || [],
            totalCount: totalRepos,
          },
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Error fetching repositories. Please try again.",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }

    getRepositories();
  }, [username, state.reposPagination.currentPage, dispatch]);

  return { state, dispatch };
}
