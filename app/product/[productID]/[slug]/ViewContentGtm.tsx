"use client";

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
  }, [product]);

  useEffect(() => {
    sendEvent();
  }, []);

  return null;
};

export default ViewContentGtm;
