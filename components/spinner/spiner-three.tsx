import React from "react";

const SpinerThree = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="w-16 h-16 bg-violet-600 rounded-full animate-ping absolute"></div>
      <div className="w-8 h-8 bg-violet-800 rounded-full"></div>
    </div>
  );
};

export default SpinerThree;
