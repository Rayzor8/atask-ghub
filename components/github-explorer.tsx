"use client";

import { useState } from "react";
import SearchForm from "@/components/search-form";
import UserList from "@/components/user-list";
import RepositoryList from "@/components/repository-list";
import EmptyState from "./ui/empty-state";
import { Computer } from "lucide-react";

export default function GitHubExplorer() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-4 mb-2">
          <Computer className=" w-8 h-8 md:w-10 md:h-10 text-[#58a6ff]" />
          <h1 className=" text-2xl md:text-4xl font-bold  ">
            {" "}
            GitHub User Explorer
          </h1>
        </div>
        <p className=" italic md:text-xl text-gray-400 mb-8">
          Search for GitHub users and explore their repositories
        </p>
        <SearchForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2 lg:col-span-1">
          <UserList
            onSelectUser={setSelectedUser}
            selectedUser={selectedUser}
          />
        </div>
        <div className="md:col-span-2">
          {selectedUser ? (
            <RepositoryList username={selectedUser} />
          ) : (
            <EmptyState> Select a user to view their repositories</EmptyState>
          )}
        </div>
      </div>
    </div>
  );
}
