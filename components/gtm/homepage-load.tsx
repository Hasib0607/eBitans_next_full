"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { useEffect } from "react";

const HomepageLoad = () => {
  useEffect(() => {
    sendGTMEvent({
      event: "page_load",
    });
  }, []);
  return <div></div>;
};

export default HomepageLoad;
