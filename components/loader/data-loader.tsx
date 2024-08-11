import React from "react";
import { Triangle } from "react-loader-spinner";

const DataLoader = () => {
  return (
    <div className="h-96 w-full flex justify-center items-center">
      <Triangle
        ariaLabel="loading-indicator"
        height="80"
        width="80"
        color="green"
      />
    </div>
  );
}; 

export default DataLoader;
