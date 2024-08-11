"use client";
import { useState, useEffect } from "react";

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setScrollDirection("down");
    } else if (currentScrollY < lastScrollY) {
      setScrollDirection("up");
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return scrollDirection;
};

export default useScrollDirection;
