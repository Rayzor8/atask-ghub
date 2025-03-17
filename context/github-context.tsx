"use client";

import { GitHubState, Repository, User } from "@/lib";
import type React from "react";

import { createContext, useContext, useReducer, type ReactNode } from "react";

type GitHubAction =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "SET_REPOSITORIES"; payload: Repository[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

// Initial state
const initialState: GitHubState = {
  users: [],
  repositories: [],
  loading: false,
  error: null,
};

// Reducer
function githubReducer(state: GitHubState, action: GitHubAction): GitHubState {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
        error: null,
      };
    case "SET_REPOSITORIES":
      return {
        ...state,
        repositories: action.payload,
        error: null,
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
    default:
      return state;
  }
}

// Context
interface GitHubContextType {
  state: GitHubState;
  dispatch: React.Dispatch<GitHubAction>;
}

const GitHubContext = createContext<GitHubContextType | undefined>(undefined);

// Provider component
export function GitHubProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GitHubContext.Provider value={{ state, dispatch }}>
      {children}
    </GitHubContext.Provider>
  );
}

// Custom hook to use the context
export function useGitHub() {
  const context = useContext(GitHubContext);

  if (context === undefined) {
    throw new Error("useGitHub must be used within a GitHubProvider");
  }

  return context;
}
