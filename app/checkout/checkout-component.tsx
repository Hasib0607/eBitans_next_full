"use client";
import Checkout from "@/components/checkout";
import useTheme from "@/hooks/use-theme";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutGtm from "./CheckoutGtm";

const CheckoutComponent = () => {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const { design, store } = useTheme();

  useEffect(() => {
    const isEmpty = (store: any) => Object.keys(store).length === 0;
    if (!isEmpty) {
      if (!user?.verify && store?.auth_type !== "EasyOrder") {
        setRedirect(true); // Set redirect to true if user is not verified and store is not "EasyOrder"
      } else if (user?.verify || store?.auth_type === "EasyOrder") {
        setRedirect(false); // Otherwise, no redirect
      }

      setLoading(false); // Stop loading after the conditions are evaluated
    }
  }, [user, store, router]);

  if (!loading && redirect) {
    router.push("/login"); // Redirect to login if the redirect condition is true
  }


  return (
    <>
      <CheckoutGtm />
      <Checkout theme={design?.checkout_page} />;
    </>
  );
};

export default CheckoutComponent;
