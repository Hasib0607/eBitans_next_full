"use client";

import { Purchase } from "@/helper/fb-tracking";
import { sendGTMEvent } from "@next/third-parties/google";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PurchaseGtm = () => {
  const searchParams = useSearchParams();
  const total = searchParams.get("total");
  const currency = "BDT";  // Define currency here or dynamically set it as needed

  useEffect(() => {
    sendGTMEvent({
      event: "purchase",
      total,
    });
    Purchase(total, currency); // Now providing both total and currency
  }, [total, currency]);

  return null;
};

export default PurchaseGtm;
