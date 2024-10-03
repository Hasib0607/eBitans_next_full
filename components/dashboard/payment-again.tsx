import { useState } from "react";
import Countdown from "react-countdown";

const PaymentAgain = ({ order, transaction }: any) => {
  const [pay, setPay] = useState("show");

  const order_create_time = new Date(order?.created_at).getTime();

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      setPay("hide");
      return;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <div>
      {(transaction?.mode === "bkash" ||
        transaction?.mode === "online" ||
        transaction?.mode === "nagad") &&
        order?.paid === 1 && (
          <div>
            <button className="px-10 w-full py-2 my-3 text-white font-bold text-lg bg-green-500 rounded-lg max-w-[300px]">
              Paid
            </button>
            <p className="w-full text-center md:text-left text-sm leading-5 text-gray-600">
              <span className="font-semibold">Transaction Id: </span>
              {transaction?.transaction_id}
            </p>
            <p className="w-full text-center md:text-left text-sm leading-5 text-gray-600">
              <span className="font-semibold">Phone: </span>
              {transaction?.number}
            </p>
          </div>
        )}
      {(transaction?.mode === "bkash" ||
        transaction?.mode === "online" ||
        transaction?.mode === "nagad") &&
        order?.paid === 0 &&
        pay === "show" && (
          <div className="text-red-500 my-3">
            Expire In:{" "}
            <Countdown date={order_create_time + 900000} renderer={renderer} />
          </div>
        )}
      {(transaction?.mode === "bkash" ||
        transaction?.mode === "online" ||
        transaction?.mode === "nagad") &&
        order?.paid === 0 &&
        pay === "show" && (
          <div className="flex max-w-[300px] justify-center items-center md:justify-start md:items-start">
            <p
              onClick={() =>
                window.location.replace(
                  `${process.env.NEXT_PUBLIC_API_URL}bkash/checkout-url/orderPay?order=${order?.id}`
                )
              }
              className="py-3 hover:bg-gray-800 hover:text-white transition-colors duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-semibold font-sans w-full text-center lg:cursor-pointer text-base text-gray-800"
            >
              Pay Now
            </p>
          </div>
        )}
    </div>
  );
};

export default PaymentAgain;
