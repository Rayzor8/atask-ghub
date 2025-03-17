"use client";

import { useState } from "react";
import { GitHubProvider } from "@/context/github-context";
import UserList from "./user-list";
import RepositoryList from "./repository-list";
import SearchForm from "./search-form";

export default function GitHubExplorer() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <GitHubProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold mb-2">GitHub User Explorer</h1>
          <p className="text-xl text-gray-400 mb-8">
            Search for GitHub users and explore their repositories
          </p>
          <SearchForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <UserList />
          </div>
          <div className="md:col-span-2">
            {selectedUser ? (
              <RepositoryList />
            ) : (
              <div className="bg-[#161b22] rounded-lg p-6 text-center">
                <p className="text-gray-400">
                  Select a user to view their repositories
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </GitHubProvider>
  );
}
