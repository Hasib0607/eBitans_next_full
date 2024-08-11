import React from "react";

const OrderStatus = ({ order }: any) => {
  return (
    <div className="mt-5 flex flex-col gap-5 relative">
      <div className="w-[2px] h-[94%] absolute left-[5px] top-[6px] bg-gray-300 z-[1]"></div>
      <div className="flex items-center gap-x-3 relative z-[2]">
        <p
          className={`h-3 w-3 rounded-full ${
            order?.status === "Pending" ? "bg-green-600" : "bg-gray-600"
          }`}
        ></p>
        <h1
          className={`${
            order?.status === "Pending" ? "font-bold" : "font-normal text-sm"
          }`}
        >
          Pending
        </h1>
      </div>
      <div className="flex items-center gap-x-3 relative z-[2]">
        <p
          className={`h-3 w-3 rounded-full ${
            order?.status === "On Hold" ? "bg-green-600" : "bg-gray-600"
          }`}
        ></p>
        <h1
          className={`${
            order?.status === "On Hold" ? "font-bold" : "font-normal text-sm"
          }`}
        >
          On Hold
        </h1>
      </div>

      <div className="flex items-center gap-x-3 relative z-[2]">
        <p
          className={`h-3 w-3 rounded-full ${
            order?.status === "Payment Success" ? "bg-green-600" : "bg-gray-600"
          }`}
        ></p>
        <h1
          className={`${
            order?.status === "Payment Success"
              ? "font-bold"
              : "font-normal text-sm"
          }`}
        >
          Payment Success
        </h1>
      </div>

      <div className="flex items-center gap-x-3 relative z-[2]">
        <p
          className={`h-3 w-3 rounded-full ${
            order?.status === "Payment Failed" ? "bg-green-600" : "bg-gray-600"
          }`}
        ></p>
        <h1
          className={`${
            order?.status === "Payment Failed"
              ? "font-bold"
              : "font-normal text-sm"
          }`}
        >
          Payment Failed
        </h1>
      </div>
      <div className="flex items-center gap-x-3 relative z-[2]">
        <p
          className={`h-3 w-3 rounded-full ${
            order?.status === "Processing" ? "bg-green-600" : "bg-gray-600"
          }`}
        ></p>
        <h1
          className={`${
            order?.status === "Processing" ? "font-bold" : "font-normal text-sm"
          }`}
        >
          Processing
        </h1>
      </div>
      <div className="flex items-center gap-x-3 relative z-[2]">
        <p
          className={`h-3 w-3 rounded-full ${
            order?.status === "Shipping" ? "bg-green-600" : "bg-gray-600"
          }`}
        ></p>
        <h1
          className={`${
            order?.status === "Shipping" ? "font-bold" : "font-normal text-sm"
          }`}
        >
          Shipping
        </h1>
      </div>
      <div className="flex items-center gap-x-3 relative z-[2]">
        <p
          className={`h-3 w-3 rounded-full ${
            order?.status === "Delivered" ? "bg-green-600" : "bg-gray-600"
          }`}
        ></p>
        <h1
          className={`${
            order?.status === "Delivered" ? "font-bold" : "font-normal text-sm"
          }`}
        >
          Delivered
        </h1>
      </div>
      <div className="flex items-center gap-x-3 relative z-[2]">
        <p
          className={`h-3 w-3 rounded-full ${
            order?.status === "Returned" ? "bg-green-600" : "bg-gray-600"
          }`}
        ></p>
        <h1
          className={`${
            order?.status === "Returned" ? "font-bold" : "font-normal text-sm"
          }`}
        >
          Returned
        </h1>
      </div>
      <div className="flex items-center gap-x-3 relative z-[2]">
        <p
          className={`h-3 w-3 rounded-full ${
            order?.status === "Cancelled" ? "bg-green-600" : "bg-gray-600"
          }`}
        ></p>
        <h1
          className={`${
            order?.status === "Cancelled" ? "font-bold" : "font-normal text-sm"
          }`}
        >
          Cancelled
        </h1>
      </div>
    </div>
  );
};

export default OrderStatus;
