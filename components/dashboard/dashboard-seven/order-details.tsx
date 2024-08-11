"use client";
import React, { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import "./order-details-seven.css";
import { useParams } from "next/navigation";
import httpReq from "@/utils/http/axios/http.service";
import { motion } from "framer-motion";
import Taka from "@/utils/taka";
import DataLoader from "@/components/loader/data-loader";
import BookingInformation from "../booking-information";
import PaymentAgain from "../payment-again";
import OrderStatus from "../order-status";
import useTheme from "@/hooks/use-theme";
import { productImg } from "@/site-settings/siteUrl";
import Link from "next/link";
import GiveReview from "../dashboard-four/order/review";

const OrderDetails = () => {
  const [loaded, setLoaded] = useState(false);
  const [call, setCall] = useState<any>(false);
  const [order, setOrder] = useState<any>({});
  const [booking, setBooking] = useState<any>({});
  const [transaction, setTransaction] = useState<any>({});
  const [orderItem, setOrderItem] = useState<any>([]);
  const [productLink, setProductLink] = useState<any>(null);
  const [copied, setCopied] = useState<any>(false);

  const { order_id } = useParams();

  console.log(order, "order data");

  useEffect(() => {
    // const fetchData = async () => {
    //   // get the data from the api
    //   const response = await httpReq.post("getorder/details", { id: order_id });
    //   return response;
    // };
    

    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const { order, orderitem, transaction, booking } = await httpReq.post(
        "getorder/details",
        { id: order_id }
      );
      setOrder(order);
      setOrderItem(orderitem);
      setBooking(booking);
      setTransaction(transaction);
      setProductLink(orderitem[0]?.product_link);
    };

    // call the function
    fetchData().catch((error) => console.log(error));
    // make sure to catch any error
  }, [order_id, call]);

  console.log( order ,"order" );

  return (
    <div className="md:w-full mt-4 md:mt-0">
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold mb-6 xl:mb-8">
        Orders
      </h2>
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        className="w-full flex flex-col"
        data-projection-id="27"
        style={{ position: "relative", top: 0, opacity: 1 }}
      >
        <table className="text-left min-w-full">
          <thead className="text-sm lg:text-base bg-white">
            <tr>
              <th className="bg-white p-4 font-semibold text-left w-max">
                Images
              </th>
              <th className="bg-white p-4 font-semibold text-left w-full">
                Product Name
              </th>
              <th className="bg-white p-4 font-semibold text-right w-max flex justify-center">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="text-sm lg:text-base">
            {orderItem?.map((item: any) => (
              <Single
                item={item}
                key={item?.id}
                call={call}
                setCall={setCall}
                order={order}
                orderItem={orderItem}
                productLink={productLink}
                setCopied={setCopied}
                copied={copied}
              />
            ))}

            <tr className="font-medium text-base border-b border-gray-300 last:border-b-0">
              <td className="px-4 py-5  italic">Subtotal</td>
              <td></td>
              <td className="flex justify-center w-full py-5 ">
                <Taka tk={order?.subtotal} />
              </td>
            </tr>
            <tr className="font-medium text-base border-b border-gray-300 last:border-b-0">
              <td className="px-4 py-5  italic">
                Discount{" "}
                {order?.coupon && (
                  <span className="bg-gray-200 p-1 rounded-md capitalize text-xs font-medium leading-3 ">
                    {order?.coupon}
                  </span>
                )}
              </td>
              <td></td>
              <td className="flex justify-center w-full py-5 ">
                <Taka tk={order?.discount} />
              </td>
            </tr>
            <tr className="font-medium text-base border-b border-gray-300 last:border-b-0">
              <td className="px-4 py-5  italic">Shipping</td>
              <td></td>
              <td className="flex justify-center w-full py-5 ">
                {" "}
                <Taka tk={order?.shipping} />
              </td>
            </tr>
            <tr className="font-medium text-base border-b border-gray-300 last:border-b-0">
              <td className="px-4 py-5  italic">Tax</td>
              <td></td>
              <td className="flex justify-center w-full py-5 ">
                {" "}
                <Taka tk={order?.tax} />
              </td>
            </tr>
            <tr className="font-medium text-base border-b border-gray-300 last:border-b-0">
              <td className="px-4 py-5  italic">Paid Amount</td>
              <td></td>
              <td className="flex justify-center w-full py-5 ">
                {" "}
                <Taka tk={order?.paid} />
              </td>
            </tr>
            <tr className="font-medium text-base border-b border-gray-300 last:border-b-0">
              <td className="px-4 py-5  italic">Total</td>
              <td></td>
              <td className="flex justify-center w-full py-5 ">
                {" "}
                <Taka tk={order?.due} />
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>
      {!order?.status ? (
        <DataLoader />
      ) : (
        <div className="flex w-full flex-col mt-6 md:mt-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0  md:space-y-0 md:flex-row  items-center md:items-start ">
            {order?.status === "Booked" ? (
              <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-1 xl:mt-8">
                <BookingInformation booking={booking} />
              </div>
            ) : (
              <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-1 xl:mt-8">
                <p className="text-base font-semibold leading-4 text-center md:text-left  pb-2">
                  Shipping Address
                </p>
                <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 capitalize">
                  <span className="font-semibold">Name: </span>
                  {order?.name}
                </p>
                <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                  <span className="font-semibold">Phone: </span>
                  {order?.phone}
                </p>
                <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                  <span className="font-semibold">Address: </span>
                  {order?.address}
                </p>
              </div>
            )}
          </div>
          <PaymentAgain transaction={transaction} order={order} />
          <div>
            {order?.status !== "Booked" && <OrderStatus order={order} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;

const Single = ({
  item,
  setCall,
  call,
  order,
  orderItem,
  productLink,
  setCopied,
  copied,
}: any) => {
  const { store_id } = useTheme();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<any>({});

  // useEffect(() => {
  //   let copyText = document.querySelector(".copy-text");
  //   copyText.querySelector("button").addEventListener("click", function () {
  //     let input = copyText.querySelector("input.text");
  //     input.select();
  //     document.execCommand("copy");
  //     copyText.classList.add("active");
  //     window.getSelection().removeAllRanges();
  //     setTimeout(function () {
  //       copyText.classList.remove("active");
  //     }, 2500);
  //   });
  // }, []);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const { product } = await httpReq.post("product-details", {
        store_id,
        product_id: item?.product_id,
      });
      setProduct(product);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [store_id, item?.product_id]);

  // console.log(item, "item");

  useEffect(() => {
    let copyText = document.querySelector(".copy-text");
    console.log(copyText);

    if (copyText !== null) {
      copyText.querySelector("button")?.addEventListener("click", function () {
        let input: any = copyText.querySelector("input.text");

        let value = input.value;

        let tempTextarea = document.createElement("textarea");
        tempTextarea.value = value;

        document.body.appendChild(tempTextarea);

        tempTextarea.select();

        document.execCommand("copy");

        document.body.removeChild(tempTextarea);

        copyText.classList.add("active");
        setTimeout(function () {
          copyText.classList.remove("active");
        }, 2500);
      });
    }
  }, [product]);

  return (
    <tr key={item?.id} className="border-b border-gray-300 last:border-b-0">
      <td>
        <img src={productImg + product?.image} alt="" className="max-h-20" />
      </td>
      <td className="px-4 py-5 w-full">
        <div className="flex items-center gap-x-3">
          <Link href={"/product/" + product?.id + "/" + product?.slug}>
            {" "}
            <p className="text-xs sm:text-base">{product?.name}</p>{" "}
          </Link>
        </div>
        <p className="text-xs sm:text-sm mt-1">Quantity: {item?.quantity}</p>
        <div className="flex flex-wrap justify-start items-start gap-2 mt-1 text-xs sm:text-sm">
          {item?.color ? (
            <div className="flex gap-2 items-center">
              <p className="text-xs sm:text-sm leading-none text-gray-600">
                Color:
              </p>
              <p
                style={{ backgroundColor: item?.color }}
                className="w-3 h-3 rounded-full ring-1 ring-offset-2 ring-gray-600"
              ></p>
            </div>
          ) : null}
          {item?.size ? (
            <p className="text-xs sm:text-sm leading-none text-gray-800">
              <span className="text-gray-600">Size: </span> {item?.size}
            </p>
          ) : null}
          {item?.unit ? (
            <p className="text-xs sm:text-sm leading-none text-gray-800">
              <span className="text-gray-600">Unit: </span>
              {item?.volume} {item?.unit}
            </p>
          ) : null}
        </div>
        {(order?.status === "Payment Success" ||
          order?.status === "Delivered") &&
        orderItem[0]?.product_link ? (
          //   <div className="w-full max-w-sm">
          //     <div className="flex items-center">
          //       <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600">
          //         URL
          //       </span>
          //       <div className="relative w-full">
          //         <input
          //           id="website-url"
          //           type="text"
          //           aria-describedby="helper-text-explanation"
          //           className="bg-gray-50 border border-e-0 border-gray-300 text-gray-500 dark:text-gray-400 text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          //           value={productLink}
          //           readonly
          //           disabled
          //         />
          //       </div>
          //       <CopyToClipboard
          //         text={productLink}
          //         onCopy={() => setCopied(true)}
          //       >
          //         <button
          //           data-tooltip-id="my-tooltip"
          //           data-tooltip-content={copied ? "Copied" : "Copy Url"}
          //           className="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-e-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-700 dark:border-blue-600 hover:border-blue-800 dark:hover:border-blue-700"
          //           type="button"
          //         >
          //           <span id="default-icon">
          //             <svg
          //               className="w-4 h-4"
          //               aria-hidden="true"
          //               xmlns="http://www.w3.org/2000/svg"
          //               fill="currentColor"
          //               viewBox="0 0 18 20"
          //             >
          //               <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
          //             </svg>
          //           </span>
          //           <span
          //             id="success-icon"
          //             className="hidden inline-flex items-center"
          //           >
          //             <svg
          //               className="w-4 h-4"
          //               aria-hidden="true"
          //               xmlns="http://www.w3.org/2000/svg"
          //               fill="none"
          //               viewBox="0 0 16 12"
          //             >
          //               <path
          //                 stroke="currentColor"
          //                 stroke-linecap="round"
          //                 stroke-linejoin="round"
          //                 stroke-width="2"
          //                 d="M1 5.917 5.724 10.5 15 1.5"
          //               />
          //             </svg>
          //           </span>
          //         </button>
          //       </CopyToClipboard>
          //       <ReactTooltip id="my-tooltip" />
          //     </div>
          //   </div>
          <div className="copy-text w-full">
            <input
              type="text"
              className="text"
              value={productLink ? productLink : ""}
              readOnly
              disabled
            />
            <button>
              <FaCopy />
            </button>
          </div>
        ) : null}
      </td>
      <td className="py-5 flex flex-col justify-center items-center gap-1 w-full font-medium text-base">
        <div>
          <Taka
            tk={
              (Number(item?.price) + Number(item?.additional_price)) *
              item?.quantity
            }
          />
        </div>
        {order?.status === "Delivered" && !item.review ? (
          <button
            onClick={() => setOpen(true)}
            className=" py-1 px-1 mt-1 border border-transparent text-xs rounded-sm text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-0"
          >
            {"Review"}
          </button>
        ) : null}
        <GiveReview
          open={open}
          setOpen={setOpen}
          item={item}
          call={call}
          setCall={setCall}
        />
      </td>
    </tr>
  );
};
