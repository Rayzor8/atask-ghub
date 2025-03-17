import React from 'react'

interface EmptyStateProps {
  children: React.ReactNode
}

export default function EmptyState({children} : EmptyStateProps) {
  return (
    <div className="bg-[#161b22] rounded-lg p-6">
    <p className="text-gray-400 text-center">{children}</p>
  </div>
  )
}
