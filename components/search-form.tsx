"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGitHub } from "@/context/github-context";
import { Search } from "lucide-react";
import { SearchFormValues, searchSchema } from "@/lib/schemas";
import fetchUsers from "@/lib/api/fetch-users";
import ErrorAlert from "./ui/error-alert";

export default function SearchForm() {
  const { dispatch, state } = useGitHub();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (data: SearchFormValues) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_SEARCH_TERM", payload: data.username });

    try {
      const responseData = await fetchUsers(data.username, 1);

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
      dispatch({
        type: "SET_REPOSITORIES",
        payload: { repositories: [], totalCount: 0 },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <div className="relative">
        <input
          {...register("username")}
          type="text"
          placeholder="Search GitHub users..."
          className={`w-full bg-[#0d1117] border ${
            errors.username ? "border-red-500" : "border-[#30363d]"
          } rounded-lg py-3 px-4 pl-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent`}
          disabled={isSubmitting}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <button
          type="submit"
          className="absolute right-2 top-2 bg-[#58a6ff] hover:bg-[#3b82f6] text-white py-1 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Searching..." : "Search"}
        </button>
      </div>

      {errors.username && <ErrorAlert>{errors.username.message}</ErrorAlert>}

      {state.error && <ErrorAlert>{state.error}</ErrorAlert>}
    </form>
  );
}
