"use client";

import { PageView } from "@/helper/fb-tracking";
import { sendGTMEvent } from "@next/third-parties/google";
import { useEffect } from "react";

const HomepageLoad = () => {
  useEffect(() => {
    sendGTMEvent({
      event: "page_load",
    });
    // PageView();
  }, [PageView]);
  return <div></div>;
};
export default HomepageLoad;
