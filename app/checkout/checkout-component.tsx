"use client";
import Checkout from "@/components/checkout";
import useTheme from "@/hooks/use-theme";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutGtm from "./CheckoutGtm";
import Skeleton from "@/components/loader/skeleton";

const CheckoutComponent = () => {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const { design, store } = useTheme();

  useEffect(() => {
    const checkAuthorization = () => {
      // Check if the store object is empty
      if (Object.keys(store).length === 0) {
        setLoading(false);
        return;
      }

      // Redirect to login if user is not verified and auth_type is not "EasyOrder"
      if (!user?.verify && store?.auth_type !== "EasyOrder") {
        router.push("/login");
      } else {
        setLoading(false); // Stop loading when authorized or store conditions are met
      }
    };

    checkAuthorization();
  }, [user, store, router]);

  // Display loading indicator until the authorization check completes
  if (loading) {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <Skeleton />
      </div>
    ); 
  }


  return (
    <>
      <CheckoutGtm />
      <Checkout theme={design?.checkout_page} />;
    </>
  );
};

export default CheckoutComponent;
