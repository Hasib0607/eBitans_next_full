"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
const FailedPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = new URL(window.location.href);
    const errorMessage = url?.searchParams?.get("error_msg");

    toast.error(errorMessage);

    router.replace("/profile/order");
  }, [router, searchParams]);

  return null;
};
export default FailedPage;
