"use client";

import { GitHubState, Repository, User } from "@/lib/types";
import type React from "react";

import { createContext, useContext, useReducer, type ReactNode } from "react";



type GitHubAction =
  | { type: "SET_USERS"; payload: { users: User[]; totalCount: number } }
  | {
      type: "SET_REPOSITORIES";
      payload: { repositories: Repository[]; totalCount: number };
    }
  | { type: "SET_USERS_PAGE"; payload: number }
  | { type: "SET_REPOS_PAGE"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_SEARCH_TERM"; payload: string };


const initialState: GitHubState = {
  users: [],
  repositories: [],
  usersPagination: {
    currentPage: 1,
    totalCount: 0,
    hasNextPage: false,
  },
  reposPagination: {
    currentPage: 1,
    totalCount: 0,
    hasNextPage: false,
  },
  loading: false,
  error: null,
  searchTerm: "",
};

// Reducer
function githubReducer(state: GitHubState, action: GitHubAction): GitHubState {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload.users,
        usersPagination: {
          ...state.usersPagination,
          totalCount: action.payload.totalCount,
          hasNextPage:
            action.payload.users.length === 10 &&
            state.usersPagination.currentPage * 10 < action.payload.totalCount,
        },
        error: null,
      };
    case "SET_REPOSITORIES":
      return {
        ...state,
        repositories: action.payload.repositories,
        reposPagination: {
          ...state.reposPagination,
          totalCount: action.payload.totalCount,
          hasNextPage:
            action.payload.repositories.length === 10 &&
            state.reposPagination.currentPage * 10 < action.payload.totalCount,
        },
        error: null,
      };
    case "SET_USERS_PAGE":
      return {
        ...state,
        usersPagination: {
          ...state.usersPagination,
          currentPage: action.payload,
        },
      };
    case "SET_REPOS_PAGE":
      return {
        ...state,
        reposPagination: {
          ...state.reposPagination,
          currentPage: action.payload,
        },
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
        // Reset pagination when search term changes
        usersPagination: {
          ...state.usersPagination,
          currentPage: 1,
        },
      };
    default:
      return state;
  }
}

interface GitHubContextType {
  state: GitHubState;
  dispatch: React.Dispatch<GitHubAction>;
}

const GitHubContext = createContext<GitHubContextType | undefined>(undefined);


export function GitHubProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GitHubContext.Provider value={{ state, dispatch }}>
      {children}
    </GitHubContext.Provider>
  );
}

export function useGitHub() {
  const context = useContext(GitHubContext);

  if (context === undefined) {
    throw new Error("useGitHub must be used within a GitHubProvider");
  }

  return context;
}
