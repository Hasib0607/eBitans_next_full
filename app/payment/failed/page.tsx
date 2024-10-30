"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
const FailedPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorMessage = searchParams.get("error_msg");
    
    if (errorMessage == "Transaction Cancel!") {
      setTimeout(() => {
        router.push("/profile/order");
      }, 1000); // Redirect after 1 second
    }
  }, [router, searchParams]);

  return (
    <>
      <div>You will be redirected to your order page</div>
    </>
  );
};
export default FailedPage;
