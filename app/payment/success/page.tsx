"use client";
import useTheme from "@/hooks/use-theme";
import { useRouter } from "next/navigation";
import { TiTickOutline } from "react-icons/ti";
const SuccessPage = () => {
  const router = useRouter();
  const { orderPlaced, design } = useTheme();
  const url = new URL(window.location.href);
  const msg = url.searchParams.get("msg");
  const error_msg = url.searchParams.get("error_msg");
  const tId = url.searchParams.get("transaction_id");
  const styleCss = `
  .order-info {
      background:  ${design?.header_color};
      color:  ${design?.text_color};
  }
`;
  if (!orderPlaced) {
    router.push("/profile/order");
    return null;
  }
  return (
    <div className="flex flex-col gap-3 justify-center items-center font-bold h-screen">
      <style>{styleCss}</style>
      <TiTickOutline className="text-green-500 text-6xl" />
      <p className="text-2xl lg:text-3xl">Thank you for your order</p>
      {msg && (
        <p className="text-xl lg:text-2xl">
          Order successfully placed with message: {msg}
        </p>
      )}
      {tId && <p className="text-xl lg:text-2xl">Transaction ID:{tId}</p>}
      <a href="/profile/order">
        <button className="order-info py-2 px-4 text-base rounded-md">
          Order Info
        </button>
      </a>
      <a href="/shop">
        <button className="text-base rounded-md underline text-[#F1593A]">
          Continue Shopping
        </button>
      </a>
    </div>
  );
};
export default SuccessPage;
