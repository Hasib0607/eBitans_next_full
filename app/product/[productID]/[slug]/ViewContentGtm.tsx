"use client";

import { ViewContent } from "@/helper/fb-tracking";
import { sendGTMEvent } from "@next/third-parties/google";
import { useCallback, useEffect } from "react";

const ViewContentGtm = ({ product }: any) => {
  const sendEvent = useCallback(() => {
    sendGTMEvent({
      event: "view_content",
      value: {
        product,
      },
    });
    ViewContent(product);
  }, [product]);

  useEffect(() => {
    sendEvent();
  }, []);

  return null;
};

export default ViewContentGtm;
