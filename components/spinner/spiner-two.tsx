import React from "react";

const SpinerTwo = () => {
  return (
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-violet-600 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-violet-600 rounded-full animate-bounce delay-200"></div>
      <div className="w-4 h-4 bg-violet-600 rounded-full animate-bounce delay-400"></div>
    </div>
  );
};

export default SpinerTwo;
