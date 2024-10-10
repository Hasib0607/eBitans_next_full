"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MyComponent = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      handleRedirect();
    }, 1000);
  }, []);

  const handleRedirect = () => {
    router.push("/shop");
  };

  return (
    <>
      <div>You will be redirected to your order page</div>
    </>
  );
};
