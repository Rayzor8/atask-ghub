import { useEffect } from "react";
import { useGitHub } from "@/context/github-context";
import fetchUsers from "@/lib/api/fetch-users";


export default function useFetchUsers() {
  const { state, dispatch } = useGitHub();
  const { usersPagination, searchTerm } = state;

  useEffect(() => {
    if (!searchTerm) return;

    async function getUsers() {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const responseData = await fetchUsers(
          searchTerm,
          usersPagination.currentPage
        );
        dispatch({
          type: "SET_USERS",
          payload: {
            users: responseData.items || [],
            totalCount: responseData.total_count || 0,
          },
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Error fetching users. Please try again.",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }

    getUsers();
  }, [searchTerm, usersPagination.currentPage, dispatch]);

  return { state, dispatch };
}
