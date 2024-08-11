"use client";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { cancelAlert } from "../../cancel-alert";

const Order = () => {
  const [call, setCall] = useState(false);
  const [orders, setOrder] = useState([]);
  const [filter, setFilter] = useState([]);
  const [btn, setBtn] = useState("All");
  const { store_id, design } = useTheme();
  const { user } = useSelector((state: any) => state.auth);

  const fetchData = async () => {
    try {
      const data = await httpReq.post("getorder", {
        user_id: user?.details?.id,
        store_id,
      });

      setOrder(data);
      setFilter(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [user?.details?.id, store_id, call]);

  const cancel_request = (id: any) => {
    cancelAlert(id, user, setCall);
  };
  const get_filter = (key: any) => {
    setBtn(key);
    if (key === "All") {
      setFilter(orders);
    }
    if (key === "Pending") {
      setFilter(orders.filter((i: any) => i.status === "Pending"));
    }
    if (key === "Shipping") {
      setFilter(orders.filter((i: any) => i.status === "Shipping"));
    }
    if (key === "Processing") {
      setFilter(orders.filter((i: any) => i.status === "Processing"));
    }
    if (key === "Delivered") {
      setFilter(orders.filter((i: any) => i.status === "Delivered"));
    }
    if (key === "Returned") {
      setFilter(orders.filter((i: any) => i.status === "Returned"));
    }
    if (key === "Cancelled") {
      setFilter(orders.filter((i: any) => i.status === "Cancelled"));
    }
  };

  const ar = [
    "All",
    "Pending",
    "Shipping",
    "Processing",
    "Delivered",
    "Returned",
    "Cancelled",
  ];
  return (
    <>
      <div>
        <div className="sm:px-6 w-full">
          <div className="px-4 md:px-10 py-2 md:py-4">
            <div className="flex items-center justify-between">
              <p
                className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal ${
                  design?.template_id === "34"
                    ? "text-gray-300"
                    : "text-gray-800"
                }`}
              >
                Your Orders
              </p>
            </div>
          </div>
          <div
            className={`${
              design?.template_id === "34" ? "bg-thirty-one" : "bg-white"
            } py-4 md:py-7 px-4 md:px-8 xl:px-10`}
          >
            <div className="sm:flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {ar.map((i, id) => (
                  <div key={id} onClick={() => get_filter(i)}>
                    <div
                      className={`${
                        btn === i ? "bg-indigo-100 text-indigo-700" : null
                      } py-2 px-8 font-medium bg-gray-100 text-gray-700 rounded-full`}
                    >
                      <p>{i}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-7 overflow-x-auto">
              {filter.length === 0 ? (
                <div className="flex justify-center items-center h-[300px] font-semibold text-2xl text-gray-400">
                  {" "}
                  Order Not found
                </div>
              ) : (
                <table className="min-w-full text-center">
                  <thead
                    className={`border-b ${
                      design?.template_id === "34"
                        ? "text-gray-300"
                        : "text-gray-800"
                    }`}
                  >
                    <tr>
                      <th scope="col" className="text-sm font-medium px-6 py-4">
                        Order#
                      </th>
                      <th scope="col" className="text-sm font-medium px-6 py-4">
                        Purchased On
                      </th>
                      <th scope="col" className="text-sm font-medium px-6 py-4">
                        Amount
                      </th>
                      <th scope="col" className="text-sm font-medium px-6 py-4">
                        Status
                      </th>
                      <th scope="col" className="text-sm font-medium px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filter?.reverse().map((order: any) => (
                      <OrderItem
                        key={order?.reference_no}
                        cancel_request={cancel_request}
                        item={order}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;

const OrderItem = ({ item, cancel_request }: any) => {
  const date = new Date(item?.created_at);

  console.log(item, "order item");

  return (
    <tr
      className={`
                ${
                  item?.status === "Pending"
                    ? "bg-purple-100 border-purple-200"
                    : item?.status === "Shipping"
                    ? "bg-blue-100 border-blue-200"
                    : item?.status === "Paid"
                    ? "bg-orange-100 border-orange-200"
                    : item?.status === "Payment Cancel"
                    ? "bg-orange-300 border-orange-400"
                    : item?.status === "Processing"
                    ? "bg-indigo-100 border-indigo-200"
                    : item?.status === "Delivered"
                    ? "bg-green-100 border-green-200"
                    : item?.status === "Returned"
                    ? "bg-yellow-100 border-yellow-200"
                    : item?.status === "Cancelled"
                    ? "bg-red-200 border-red-200"
                    : item?.status === "Payment Failed"
                    ? "bg-pink-300 border-pink-300"
                    : item?.status === "On Hold"
                    ? "bg-gray-100 border-gray-200"
                    : null
                } border-b`}
    >
      {/* order reference no  */}
      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
        <Link href={"/profile/order/" + item?.id}>#{item?.reference_no}</Link>
      </td>
      {/* date  */}
      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
        {date.toLocaleString()}
      </td>
      {/* ammount  */}
      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
        {item?.subtotal}
      </td>
      {/* status  */}
      <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
        {item?.status}
      </td>

      {/* actions */}
      <td className="text-sm text-gray-900 font-medium space-x-2 py-4 whitespace-nowrap">
        <Link
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-400 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          href={"/profile/order/" + item?.id}
        >
          {"View"}
        </Link>
        {item?.status !== "Cancelled" && item?.status !== "Delivered" ? (
          <button
            onClick={() => cancel_request(item?.id)}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel Request
          </button>
        ) : null}
      </td>
    </tr>
  );
};
