"use client";

import React, { useState } from "react";

interface ImageZoomProps {
  img: string;
  zoomScale?: number;
}

const ImageZoomNew = ({ img, zoomScale = 105 }: ImageZoomProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={img}
        alt="Product Image"
        className={`w-full h-full object-cover transition-transform duration-300 ease-in-out ${
          isHovered ? `scale-150` : "scale-100"
        }`}
      />
    </div>
  );
};

export default ImageZoomNew;
