"use client";
import { useEffect, useState } from "react";

const useAnnouncementScroll = () => {
  const [announcementHeight, setAnnouncementHeight] = useState(0);
  const [scrollPassed, setScrollPassed] = useState(false);

  useEffect(() => {
    const announcementElement = document.getElementById("annoucement");
    if (announcementElement) {
      const height = announcementElement.offsetHeight;
      setAnnouncementHeight(height);
    }

    const handleScroll = () => {
      if (window.scrollY >= announcementHeight) {
        setScrollPassed(true);
      } else {
        setScrollPassed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPassed]);

  return { announcementHeight, scrollPassed };
};

export default useAnnouncementScroll;
