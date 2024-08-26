"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PurchaseGtm = () => {
  const searchParams = useSearchParams();
  const total = searchParams.get("total");
  console.log(total);
  useEffect(() => {
    sendGTMEvent({
      event: "purchase",
      total,
    });
  }, []);

  return null;
};

export default PurchaseGtm;
