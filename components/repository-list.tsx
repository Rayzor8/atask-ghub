"use client";
import { Book, Star, GitFork } from "lucide-react";
import Pagination from "./pagination";
import Loader from "./ui/loader";
import EmptyState from "./ui/empty-state";
import useFetchRepositories from "@/hooks/useFetchRepositories";

interface RepositoryListProps {
  username: string;
}

export default function RepositoryList({ username }: RepositoryListProps) {
  const { state, dispatch } = useFetchRepositories(username);
  const { repositories, loading, reposPagination } = state;

  const handlePrevious = () => {
    if (reposPagination.currentPage > 1) {
      dispatch({
        type: "SET_REPOS_PAGE",
        payload: reposPagination.currentPage - 1,
      });
    }
  };

  const handleNext = () => {
    if (reposPagination.hasNextPage) {
      dispatch({
        type: "SET_REPOS_PAGE",
        payload: reposPagination.currentPage + 1,
      });
    }
  };

  if (loading) return <Loader />;

  if (repositories.length === 0)
    return <EmptyState>No repositories found</EmptyState>;

  return (
    <div className="bg-[#161b22] rounded-lg overflow-hidden">
      <div className="p-4 border-b border-[#30363d] flex items-center justify-between">
        <h2 className="text-xl font-semibold">{username}`s Repositories</h2>
        <span className="bg-[#238636] text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
          {reposPagination.totalCount}
        </span>
      </div>
      <ul className="divide-y divide-[#30363d]">
        {repositories.map((repo) => (
          <li key={repo.id} className="p-4 hover:bg-[#1f2937]">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <Book className="w-4 h-4 mr-2 text-gray-400" />
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#58a6ff] hover:underline"
                >
                  {repo.name}
                </a>
              </div>

              {repo.description && (
                <p className="text-sm text-gray-400">{repo.description}</p>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-400">
                {repo.language && (
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-[#238636] mr-1"></span>
                    {repo.language}
                  </span>
                )}

                <span className="flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  {repo.stargazers_count}
                </span>

                <span className="flex items-center">
                  <GitFork className="w-3 h-3 mr-1" />
                  {repo.forks_count}
                </span>

                {repo.updated_at && (
                  <span>
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={reposPagination.currentPage}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={reposPagination.currentPage > 1}
        hasNext={reposPagination.hasNextPage}
        totalCount={reposPagination.totalCount}
      />
    </div>
  );
}
