import React from "react";

export default function Loader() {
  return (
    <div className="bg-[#161b22] rounded-lg p-6">
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    </div>
  );
}
