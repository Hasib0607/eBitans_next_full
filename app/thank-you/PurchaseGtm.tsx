"use client";

import { Purchase } from "@/helper/fb-tracking";
import { sendGTMEvent } from "@next/third-parties/google";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PurchaseGtm = () => {
  const searchParams = useSearchParams();
  const total = searchParams.get("total");
  useEffect(() => {
    sendGTMEvent({
      event: "purchase",
      total,
    });
    Purchase(total);
  }, []);

  return null;
};

export default PurchaseGtm;
