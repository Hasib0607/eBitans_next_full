
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import moment from "moment";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import Link from "next/link";

const Orders = () => {
  const [call, setCall] = useState(false);
  const [orders, setOrder] = useState([]);
  const { store_id } = useTheme();
  const { user } = useSelector((state: any) => state.auth);
  const token = user?.token;

  // console.log(orders,"orders");

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await httpReq.post("getorder", {
        // user_id: user?.details?.id,
        token,
        store_id,
      });

      setOrder(data);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch((err) => {});
  }, [user?.details?.id, store_id, call, token]);

  const cancel_request = (id: any) => {
    confirmAlert({
      title: "Confirm to Done",
      message: "Are you sure to cancel this order.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            httpReq
              .post("order/cancel", { id, user_id: user?.details?.id })
              .then((res: any) => {
                if (res?.success) {
                  setCall(!call);
                  toast(res?.success, {
                    type: "success",
                  });
                }
              });
          },
        },
        {
          label: "No",
          onClick: () =>
            toast("rejected", {
              type: "warning",
            }),
        },
      ],
    });
  };

  const styleCss = `
    ::-webkit-scrollbar {
        height: 3px;
      }
  `;
  return (
    <div className="md:w-full mt-4 md:mt-0">
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold mb-6 xl:mb-8">
        Orders
      </h2>
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        className="w-full flex flex-col overflow-x-scroll "
        data-projection-id="27"
        style={{ position: "relative", top: 0, opacity: 1 }}
      >
        <style>{styleCss}</style>
        <table>
          <thead className="text-sm lg:text-base bg-white">
            <tr>
              <th className="bg-white p-4 font-semibold  first:rounded-ts-md">
                Order
              </th>
              <th className="bg-white p-4 font-semibold  lg:text-center">
                Date
              </th>
              <th className="bg-white p-4 font-semibold  lg:text-center">
                Status
              </th>
              <th className="bg-white p-4 font-semibold  lg:text-center">
                Total
              </th>
              <th className="bg-white p-4 font-semibold  lg:text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm lg:text-base">
            {orders?.reverse().map((item: any) => (
              <tr
                key={item?.id}
                className="border-b border-gray-300 last:border-b-0"
              >
                <td className="px-4 py-5 ">#{item?.reference_no}</td>
                <td className=" lg:text-center px-4 py-5">
                  {moment(item?.created_at).format("MMMM Do YYYY")}
                </td>
                <td className=" lg:text-center px-4 py-5">{item?.status}</td>
                <td className=" lg:text-center px-4 py-5">{item?.total}</td>
                <td className="text-end  flex justify-end gap-2 py-5 text-right">
                  <Link
                    href={"/profile/order/" + item?.id}
                    className="text-sm leading-4 text-white bg-black px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                  >
                    view
                  </Link>
                  <button
                    onClick={() => cancel_request(item?.id)}
                    className="text-sm leading-4 text-white bg-red-700 px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Orders;
