"use client";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { AiOutlineUpload } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import useTheme from "@/hooks/use-theme";
import { getPrice } from "@/utils/get-price";
import {
  clearCartList,
  removeToCartList,
} from "@/redux/features/product.slice";
import { login } from "@/redux/features/auth.slice";
import { useRouter } from "next/navigation";
import httpReq from "@/utils/http/axios/http.service";
import Taka from "@/utils/taka";
import { btnhover } from "@/site-settings/style";
import MyModal from "@/components/modal";
import { productImg } from "@/site-settings/siteUrl";
import Link from "next/link";

const YourOrders = ({
  couponDis,
  coupon,
  selectAddress,
  selectPayment,
  shipping_area,
  couponResult,
  setLoadPay,
  token,
  userName,
  userPhone,
  userAddress,
  setToken,
}: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState<any>(false);
  const [tax, setTax] = useState<any>(0);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [description, setDescription] = useState<any>(null);
  let [isOpen, setIsOpen] = useState<any>(false);
  let [files, setFiles] = useState<any>([]);
  let [index, setIndex] = useState<any>(null);

  const { headerSetting, store_id, design, store, setOrderPlaced } = useTheme();
  const { user } = useSelector((state: any) => state.auth);
  const cartList = useSelector((state: any) => state.cart.cartList);

  const dispatch = useDispatch();
  const priceList = cartList?.map((p: any) => p.qty * p?.price);

  const total = priceList.reduce(
    (previousValue: any, currentValue: any) => previousValue + currentValue,
    0
  );

  if (
    total < couponResult?.min_purchase ||
    (couponResult?.max_purchase && total > couponResult?.max_purchase) ||
    !couponDis
  ) {
    couponDis = 0;
  }

  const onFileChange = (e: any) => {
    setSelectedFiles(e.target.files);
  };

  function closeModal() {
    setIsOpen(false);
  }

  const handleFile = () => {
    setFiles((prevFiles: any) => {
      // If cartId exists, replace the old entry with the new one
      const updatedFiles = prevFiles.map((item: any) => {
        if (item?.cartId === index) {
          return {
            cartId: index,
            files: selectedFiles,
            description: description,
          };
        }
        return item;
      });

      // If cartId didn't exist in the previous array, add the new entry
      if (!updatedFiles.some((item: any) => item?.cartId === index)) {
        updatedFiles.push({
          cartId: index,
          files: selectedFiles,
          description: description,
        });
      }

      return updatedFiles;
    });
  };

  const updatedCartList = cartList.map((cart: any, index: any) => {
    if (files[index]) {
      return {
        ...cart,
        items: [files[index]], // Adding the new property 'items' with the product object from data
      };
    }
    return cart; // Return the cart as is if there's no corresponding product in data
  });

  useEffect(() => {
    if (headerSetting?.tax) {
      const tax = (parseInt(headerSetting?.tax) / 100) * total;
      setTax(tax);
    }
  }, [headerSetting?.tax, total]);

  // facebook tracking
  // useEffect(() => {
  //   const names = cartList.map((cart: any) => {
  //     return cart.name;
  //   });

  //   AddToCart(names, "product");
  // }, [cartList]);

  // const onSubmit = async () => {

  //     const dataInfo = {
  //         name: userName,
  //         phone: userPhone,
  //         address:userAddress,
  //         store_id: store_id,
  //     }

  //     if (store?.auth_type === 'EasyOrder' && !user) {

  //         const response = await axios.post('https://admin.ebitans.com/api/v1/address/easy-order/save', dataInfo)
  //         setToken(response?.data?.token)
  //         toast(response?.data?.success, { type: 'success' })
  //     }
  // };

  const apiOrder = "https://admin.ebitans.com/api/v1/placeorder";

  const handleCheckout = async () => {
    setLoading(true);
    const cart = updatedCartList.map((item: any) => ({
      id: item.id,
      quantity: item.qty,
      // discount:
      //   item.regular_price -
      //   getPrice(
      //     item?.regular_price,
      //     item?.discount_price,
      //     item?.discount_type
      //   ),
      price: item?.price - item.additional_price,
      size: item.size,
      color: item.color,
      additional_price: item.additional_price,
      unit: item.unit,
      volume: item.volume,
      items: item?.items,
    }));

    const formData = new FormData();

    for (let i = 0; i < cart.length; i++) {
      if (cart[i]?.items) {
        for (let j = 0; j < cart[i].items.length; j++) {
          if (cart[i]?.items[i]?.description) {
            formData.append(
              `product[${i}][items][${i}][description]`,
              cart[i]?.items[i]?.description
            );
          }
          if (cart[i].items[j]?.files?.length > 0) {
            for (let k = 0; k < cart[i].items[j].files.length; k++) {
              formData.append(
                `product[${i}][items][${j}][files][${k}]`,
                cart[i].items[j].files[k]
              );
            }
          }
        }
      }
    }

    for (let i = 0; i < cart.length; i++) {
      // Append all non-image properties of the cart item
      for (let key in cart[i]) {
        if (key !== "items") {
          formData.append(`product[${i}][${key}]`, cart[i][key]);
        }
      }
    }

    const data = {
      store_id: store_id,
      name: selectAddress?.name,
      phone: selectAddress?.phone,
      payment_type: selectPayment,
      address: selectAddress?.address,
      subtotal: total,
      shipping: parseInt(shipping_area),
      total: total + tax + parseInt(shipping_area) - couponDis,
      discount: couponDis,
      product: cart,
      tax: tax,
      coupon: coupon ? coupon : null,
    };

    formData.append("store_id", store_id);
    formData.append(
      "name",
      store?.auth_type === "EasyOrder" && !user ? userName : selectAddress?.name
    );
    formData.append(
      "phone",
      store?.auth_type === "EasyOrder" && !user
        ? userPhone
        : selectAddress?.phone
    );
    formData.append("payment_type", selectPayment);
    formData.append(
      "address",
      store?.auth_type === "EasyOrder" && !user
        ? userAddress
        : selectAddress?.address
    );
    formData.append("subtotal", total);
    formData.append("shipping", shipping_area);
    // formData.append("total", total + tax + shipping_area - couponDis);
    formData.append("discount", couponDis);
    formData.append("tax", tax);
    formData.append("coupon", coupon ? coupon : "");

    // console.log(data, "address");
    if (!userAddress && !data.address) {
      toast("Please Select The Address", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (!userPhone && !user) {
      toast("Please write your phone number", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (!userName && !user) {
      toast("Please write your name", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (!data.payment_type) {
      toast("Please Select Payment Method", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (!shipping_area || shipping_area === "--Select Area--") {
      toast("Please Select Shipping Area", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (
      data?.total &&
      data?.payment_type &&
      data?.product &&
      shipping_area &&
      (data.address || (userAddress && userName && userPhone))
    ) {
      setLoadPay(true);
      if (store?.auth_type === "EasyOrder" && !user) {
        const dataInfo = {
          name: userName,
          phone: userPhone,
          address: userAddress,
          store_id: store_id,
        };
        const responseInfo = await axios.post(
          "https://admin.ebitans.com/api/v1/address/easy-order/save",
          dataInfo
        );
        const placeOrder = async () => {
          try {
            const response = await axios.post(apiOrder, formData, {
              headers: {
                Authorization: `Bearer ${responseInfo?.data?.token?.token}`,
                "Content-Type": "application/json", // Adjust the content type according to your API requirements
              },
            });

            if (response?.data?.url) {
              window.location.replace(response?.data.url);
              dispatch(clearCartList());
            }

            if (response?.data) {
              if (!response?.data?.url && !response?.data?.error) {
                toast(
                  `Your #${response?.data?.order?.reference_no} order complete successfully!`,
                  {
                    type: "success",
                    autoClose: 1000,
                  }
                );

                dispatch(clearCartList());
                dispatch(login({ tokenData: responseInfo?.data?.token }) as any)
                  .unwrap()
                  .then(({ verify, error }: any) => {
                    if (error) {
                      toast(error, { type: "error" });
                      router.push("/login");
                    }

                    if (verify) {
                      // toast(verify, { type: 'success' })
                      // window.location.replace("/profile");
                      setOrderPlaced(true);
                      router.push(`/thank-you?total=${total}`);
                      dispatch(clearCartList());
                    }
                  })
                  .catch((er: any) => {
                    toast("Credential Doesn't Match", { type: "error" });
                  });
                // navigate("/profile/order")
              }
              if (response?.data?.error) {
                toast(response?.data?.error, {
                  type: "error",
                  autoClose: 1000,
                });
                setLoading(false);
              }
            }
            if (response?.data?.user) {
              // localStorage.setItem("user", JSON.stringify(response.user));
            }
          } catch (error) {
            // console.error('Error posting data:', error);
            // Handle any errors here
          }
        };

        // Call the function whenever you want to post data with the token
        placeOrder();
      } else {
        httpReq
          .post(`placeorder`, formData)
          .then((response) => {
            // console.log('successful:', response);
            if (response?.url) {
              window.location.replace(response.url);
              dispatch(clearCartList());
            }

            if (response) {
              if (!response?.url && !response?.error) {
                toast(
                  `Your #${response?.order?.reference_no} order complete successfully!`,
                  {
                    type: "success",
                    autoClose: 1000,
                  }
                );
                setOrderPlaced(true);
                router.push(`/thank-you?total=${total}`);
                dispatch(clearCartList());
              }
              if (response?.error) {
                toast(response?.error, {
                  type: "error",
                  autoClose: 1000,
                });
                setLoading(false);
              }
            }
            if (response?.user) {
              // localStorage.setItem("user", JSON.stringify(response.user));
            }
          })
          .catch((error) => {
            const { errors, message } = error.response.data;
            console.log(errors);
            console.log(message);
            // error.response.data?.errors.map(i => alert.show(i.message, { type: 'error' }))
          });
      }
    } else {
      setLoading(false);
    }
  };

  console.log(total, "total");

  return (
    <div>
      {/* {error && <SnackBar open={true} msg={error} />} */}
      {store_id === 1850 && (
        <h1 className="my-3 text-xl font-semibold">
          Ship From Abroad{" "}
          <span className="text-gray-700 text-sm font-medium">
            (Delivery in 15 to 20 days)
          </span>
        </h1>
      )}
      <h3 className="text-center font-semibold text-lg text-black">
        Your Items
      </h3>
      {cartList ? (
        <>
          <div className="my-6">
            <div className=" flex flex-col justify-between bg-white shadow-xl">
              {/* Replace with your content */}
              <div className="px-4 sm:px-2 h-2/3 overflow-y-scroll">
                {cartList?.map((item: any) => (
                  <div key={item.cartId} onClick={() => setIndex(index)}>
                    <Single
                      files={files}
                      index={index}
                      item={item}
                      setDescription={setDescription}
                      onFileChange={onFileChange}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      setFiles={setFiles}
                      handleFile={handleFile}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="">
          <h3 className="text-center font-semibold text-lg text-black">
            No Products Found
          </h3>
        </div>
      )}
      <hr className="my-5" />
      <div className="my-5 text-gray-500 " style={{ fontWeight: 500 }}>
        <div className="flex justify-between items-center">
          <p>Sub Total</p>
          <p>
            <Taka tk={parseInt(total)} />
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p>Discount</p>
          <p>{<Taka tk={couponDis} />}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Tax</p>
          <p>{<Taka tk={parseInt(tax)} />}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Estimated Shipping</p>
          {shipping_area === "--Select Area--" ? (
            <p>
              <Taka /> 0
            </p>
          ) : (
            <p>
              <Taka tk={shipping_area ? shipping_area : 0} />
            </p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p>Total</p>
          {shipping_area === "--Select Area--" || shipping_area === null ? (
            <p>{<Taka tk={parseInt(total + tax) - couponDis} />}</p>
          ) : (
            <p>
              {
                <Taka
                  tk={
                    parseInt(total + tax) + parseInt(shipping_area) - couponDis
                  }
                />
              }
            </p>
          )}
        </div>
      </div>

      {loading ? (
        <button
          className={`font-semibold tracking-wider my-1 rounded-sm border border-gray-300 w-full py-3 ${btnhover}`}
          style={{
            backgroundColor: design?.header_color,
            color: design?.text_color,
          }}
        >
          Loading
        </button>
      ) : (
        <button
          // disabled={userPhone?.length !== 11}
          className={`font-semibold tracking-wider my-1 rounded-sm border border-gray-300 w-full py-3 ${btnhover}`}
          style={{
            backgroundColor: design?.header_color,
            color: design?.text_color,
          }}
          onClick={() => handleCheckout()}
        >
          {store_id !== 5184 ? "Place Order" : "Confirm Order"}
        </button>
      )}

      <MyModal
        files={files}
        index={index}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
        setDescription={setDescription}
        onFileChange={onFileChange}
        handleFile={handleFile}
      ></MyModal>
    </div>
  );
};

export default YourOrders;

const Single = ({ item, setIsOpen, files, index }: any) => {
  const { module } = useTheme();

  const uploadFile = module?.find((item: any) => item?.modulus_id === 104);

  function openModal() {
    setIsOpen(true);
  }

  const dispatch = useDispatch();

  const file = files.some((i: any) => i.cartId === index);

  // const price = getPrice(item.regular_price, item.discount_price, item.discount_type)

  return (
    <div
      key={item.id}
      className="grid grid-cols-5 space-y-2 space-x-1 items-center last:border-0 border-b border-gray-400 py-2"
    >
      <div className="flex items-center gap-2 col-span-3">
        <div className="w-14">
          <img className="w-14 h-14 " src={productImg + item.image[0]} alt="" />
        </div>
        <div className="flex flex-col gap-x-2 gap-y-1 pl-2 justify-start">
          <h3 className="text-black text-md  font-normal">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              {item.name.slice(0, 25)}
              {item.name.length > 25 && "..."}
            </Link>
          </h3>
          <p className="text-sm">
            &#2547; {parseInt(item?.price)} * {item?.qty}{" "}
          </p>
        </div>
      </div>
      {/* <div className="flex flex-col gap-1 justify-center items-center">
            <MdOutlineKeyboardArrowUp onClick={() => dispatch(addToCartList({ ...item }))} />
            <p>{item.qty}</p>
            <MdKeyboardArrowDown onClick={() => dispatch(decrementQty(item.cartId))} />
        </div> */}
      <div className="text-md font-semibold justify-self-center">
        <Taka tk={item?.price * item?.qty} />
      </div>
      <div className="justify-self-end flex items-center gap-x-2">
        <MdDelete
          onClick={() => dispatch(removeToCartList(item.cartId))}
          className="text-2xl lg:cursor-pointer"
        />
        {uploadFile?.status === "1" && (
          <button
            onClick={() => openModal()}
            className="text-2xl lg:cursor-pointer"
          >
            {file ? <FaEdit /> : <AiOutlineUpload />}
          </button>
        )}
      </div>
    </div>
  );
};
