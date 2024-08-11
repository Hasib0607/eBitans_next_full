"use client";
import React, { useState } from "react";
import ReactImageZoom from "react-image-zoom";

export default function ImageZoom(props: any) {
  const [zoomed, setZoomed] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseMove = (e: any) => {
    if (zoomed) {
      const imgRect = e.currentTarget.getBoundingClientRect();
      const scale = imgRect.width / props.zoomWidth;
      setX((e.clientX - imgRect.left) * scale);
      setY((e.clientY - imgRect.top) * scale);
    }
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setZoomed(false)}
    >
      <ReactImageZoom
        {...props}
        zoomPosition="original"
        zoomStyle={{
          position: "absolute",
          top: 0,
          left: "100%",
          zIndex: 999,
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
        }}
        onZoomChange={(zoomed: any) => setZoomed(zoomed)}
      />
      {zoomed && (
        <img
          src={props.img}
          alt=""
          style={{
            position: "absolute",
            top: -y + props.height / 2,
            left: -x + props.width,
            width: props.width * 2,
            height: props.height * 2,
            transform: "scale(0.5)",
          }}
        />
      )}
    </div>
  );
}
