"use client";

import Pagination from "./pagination";
import Loader from "./ui/loader";
import EmptyState from "./ui/empty-state";
import Image from "next/image";
import useFetchUsers from "@/hooks/useFetchUsers";

interface UserListProps {
  onSelectUser: (username: string) => void;
  selectedUser: string | null;
}

export default function UserList({
  onSelectUser,
  selectedUser,
}: UserListProps) {
  const { state, dispatch } = useFetchUsers();
  const { users, loading, usersPagination } = state;

  const handlePrevious = () => {
    if (usersPagination.currentPage > 1) {
      dispatch({
        type: "SET_USERS_PAGE",
        payload: usersPagination.currentPage - 1,
      });
    }
    dispatch({
      type: "SET_REPOSITORIES",
      payload: { repositories: [], totalCount: 0 },
    });
  };

  const handleNext = () => {
    if (usersPagination.hasNextPage) {
      dispatch({
        type: "SET_USERS_PAGE",
        payload: usersPagination.currentPage + 1,
      });

      dispatch({
        type: "SET_REPOSITORIES",
        payload: { repositories: [], totalCount: 0 },
      });
    }
  };

  if (loading) return <Loader />;

  if (users.length === 0) return <EmptyState>No users found</EmptyState>;

  return (
    <div className="bg-[#161b22] rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-[#30363d]">
        <h2 className="text-xl font-semibold">Users</h2>
        <span className="bg-[#238636] text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
          {usersPagination.totalCount}
        </span>
      </div>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className={`border-b border-[#30363d] last:border-b-0 ${
              selectedUser === user.login
                ? "bg-[#0d419d]"
                : "hover:bg-[#1f2937]"
            }`}
          >
            <button
              onClick={() => onSelectUser(user.login)}
              className="w-full p-4 flex items-center text-left cursor-pointer"
            >
              <Image
                src={user.avatar_url || "/placeholder.svg"}
                alt={`${user.login}'s avatar`}
                width={40}
                height={40}
                priority
                className="w-10 h-10 rounded-full mr-6 border border-white shadow-2xl"
              />
              <div>
                <p className="font-medium">{user.login}</p>
                <p className="text-sm text-gray-400">View repositories</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={usersPagination.currentPage}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={usersPagination.currentPage > 1}
        hasNext={usersPagination.hasNextPage}
        totalCount={usersPagination.totalCount}
      />
    </div>
  );
}
