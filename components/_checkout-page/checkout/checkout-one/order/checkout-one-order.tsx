"use client";
import MyModal from "@/components/modal";
import useTheme from "@/hooks/use-theme";
import { login } from "@/redux/features/auth.slice";
import {
  clearCartList,
  removeToCartList,
} from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import { btnhover } from "@/site-settings/style";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import getReferral from "@/utils/getReferral";
import PaymentGateway from "../payment/checkout-one-payment-gateway";
import { FaEdit } from "react-icons/fa";
import { AiOutlineUpload } from "react-icons/ai";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { decrementQty, incrementQty } from "@/redux/features/product.slice";
import { IoIosLock } from "react-icons/io";

const YourOrders = ({
  couponDis,
  coupon,
  selectAddress,
  selectPayment,
  setSelectPayment,
  shipping_area,
  couponResult,
  setLoadPay,
  token,
  userName,
  userPhone,
  userAddress,
  userDistrict,
  note,
  setShipping_area,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [tax, setTax] = useState<any>(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState(null);
  let [isOpen, setIsOpen] = useState(false);
  let [files, setFiles] = useState([]);
  let [index, setIndex] = useState(null);

  const { headerSetting, store_id, design, store, setOrderPlaced } = useTheme();

  const cartList = useSelector((state: any) => state.cart.cartList);
  const { user } = useSelector((state: any) => state.auth);

  const router = useRouter();
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
      const tax = (headerSetting?.tax / 100) * total;
      setTax(tax);
    }
  }, [headerSetting?.tax, total]);

  const apiOrder = process.env.NEXT_PUBLIC_API_URL + "placeorder";

  const handleCheckout = async () => {
    setLoading(true);
    // Retrieve the referral code from localStorage
    const referralCode = localStorage.getItem("referralCode");

    const cart = updatedCartList.map((item: any) => ({
      id: item.id,
      quantity: item.qty,
      discount:
        item.regular_price -
        getPrice(item.regular_price, item.discount_price, item.discount_type)!,
      price: item?.price - item.additional_price,
      size: item.size,
      color: item.color,
      additional_price: item.additional_price,
      unit: item.unit,
      volume: item.volume,
      items: item?.items,
      referral_code: getReferral(item.id),
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
      district: userDistrict,
      subtotal: total,
      shipping: parseInt(shipping_area),
      total:
        parseInt(total) + parseInt(tax) + parseInt(shipping_area) - couponDis,
      discount: couponDis,
      product: cart,
      tax: tax,
      coupon: coupon ? coupon : null,
      referral_code: referralCode || "",
      note: note || "",
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
    formData.append(
      "district",
      store?.auth_type === "EasyOrder" && !user
        ? userAddress
        : selectAddress?.district
    );
    formData.append("subtotal", total);
    formData.append("shipping", shipping_area);
    formData.append(
      "total",
      (total + tax + parseInt(shipping_area) - couponDis).toString()
    );
    formData.append("discount", couponDis);
    formData.append("tax", tax);
    formData.append("coupon", coupon ? coupon : "");
    // Append referral code if available
    if (referralCode) {
      formData.append("referral_code", referralCode);
    }
    formData.append("note", note);

    if (!userAddress && !data.address) {
      toast("Please Select The Address", {
        type: "warning",
        autoClose: 1000,
      });
    }
    if (!userDistrict && !data.district) {
      toast("Please Select The District", {
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
      data.total &&
      data.payment_type &&
      data.product &&
      shipping_area &&
      (data.address || (userAddress && userName && userPhone && userDistrict))
    ) {
      setLoadPay(true);

      if (store?.auth_type === "EasyOrder" && !user) {
        const dataInfo = {
          name: userName,
          phone: userPhone,
          district: userDistrict,
          address: userAddress,
          store_id: store_id,
        };
        const responseInfo = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "address/easy-order/save",
          dataInfo
        );

        const placeOrder = async () => {
          try {
            const response = await axios.post(apiOrder, formData, {
              headers: {
                Authorization: `Bearer ${responseInfo?.data?.token?.token}`,
                "Content-Type": "application/json",
              },
            });
            if (response?.data?.url) {
              window.location.replace(response?.data.url);
              localStorage.removeItem("referralObj");
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
                setOrderPlaced(true);
                dispatch(clearCartList());
                dispatch(login({ tokenData: responseInfo?.data?.token }) as any)
                  .unwrap()
                  .then(({ verify, error }: any) => {
                    if (verify) {
                      // toast(verify, { type: 'success' })
                      // window.location.replace("/profile");
                      setOrderPlaced(true);
                      router.push("/thank-you?total=" + data.total);
                      dispatch(clearCartList());
                    }
                    if (error) {
                      toast(error, { type: "error" });
                      router.push("/login");
                    }
                  })
                  .catch((er: any) => {
                    toast("Credential Doesn't Match", { type: "error" });
                  });
                router.push("/profile/order");
              }
              if (response?.data?.error) {
                toast(response?.data?.error, {
                  type: "error",
                  autoClose: 1000,
                });
                setLoading(false);
              }
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
          .then((response: any) => {
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
                router.push("/thank-you?total=" + data.total);
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
            // console.log(errors);
            // console.log(message);
            // error.response.data?.errors.map(i => alert.show(i.message, { type: 'error' }))
          });
      }
    } else {
      setLoading(false);
    }
  };

  const styleCss = `

    .cart-btn {
        color: ${design?.text_color};
        background:  ${design?.header_color};
        border: 2px solid  ${design?.header_color};
    }
    .cart-btn:hover {
        color:  ${design?.header_color};
        background: transparent;
        border: 2px solid  ${design?.header_color};
    }
  `;

  // useEffect(() => {
  //   Purchase(parseInt(total + tax), "BDT");
  //   AddToCart();
  // }, [total, tax]);

  return (
    <div className="border p-5 sm:rounded-md shadow">
      <style>{styleCss}</style>
      {/* {error && <SnackBar open={true} msg={error} />} */}
      <div className="mb-12">
        <h3 className="text-center font-semibold text-xl">প্রোডাক্ট ডিটেইল</h3>
        <hr
          className="border-dashed border-gray-300 my-2 w-36 mx-auto"
          style={{ borderWidth: "1.5px", borderStyle: "dashed" }}
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold">প্রোডাক্টের নাম</p>
        <p className="font-semibold">বিক্রয় মূল্য</p>
      </div>
      <hr
        className="border-dashed border-gray-300 my-2 w-full mx-auto"
        style={{ borderWidth: "1px", borderStyle: "dashed" }}
      />
      {cartList ? (
        <>
          <div className="">
            <div className=" flex flex-col justify-between">
              {/* Replace with your content */}
              <div className="px-2 h-2/3 overflow-y-auto">
                {cartList?.map((item: any, index: any) => (
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
                      setShipping_area={setShipping_area}
                      shipping_area={shipping_area}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr
            className="border-dashed border-gray-300 w-full mx-auto"
            style={{ borderWidth: "1.px", borderStyle: "dashed" }}
          />
        </>
      ) : (
        <div className="">
          <h3 className="text-center font-semibold text-lg ">
            No Products Found
          </h3>
        </div>
      )}

      <div className="my-5 text-gray-500 px-2" style={{ fontWeight: 500 }}>
        <div className="flex justify-between items-center">
          <p>সাব টোটাল</p>
          <p>
            <BDT price={parseInt(total)} />
          </p>
        </div>
        {couponDis ? (
          <div className="flex justify-between items-center">
            <p>ডিসকাউন্ট</p>
            <p>{<BDT price={couponDis} />}</p>
          </div>
        ) : null}
        {tax ? (
          <div className="flex justify-between items-center">
            <p>ট্যাক্স</p>
            <p>{<BDT price={parseInt(tax)} />}</p>
          </div>
        ) : null}
        <div className="flex justify-between items-center pb-1">
          <p>এস্টিমেটেড শিপিং</p>
          {shipping_area && (
            <p>
              <BDT price={shipping_area ? shipping_area : 0} />
            </p>
          )}
        </div>
        <hr
          className="border-dashed border-gray-300 w-full mx-auto"
          style={{ borderWidth: "1px", borderStyle: "dashed" }}
        />
        <div className="flex justify-between items-center mt-1 font-semibold">
          <p>টোটাল</p>
          {shipping_area === "--Select Area--" || shipping_area === null ? (
            <p>{<BDT price={parseInt(total + tax) - couponDis} />}</p>
          ) : (
            <p className="font-bold text-xl">
              {
                <BDT
                  price={
                    parseInt(total + tax) + parseInt(shipping_area) - couponDis
                  }
                />
              }
            </p>
          )}
        </div>
        <PaymentGateway
          selectPayment={selectPayment}
          setSelectPayment={setSelectPayment}
        />
      </div>

      {store_id === 3020 && (
        <div>
          <p className="px-2">
            <span className="my-1 font-bold">
              Bkash/Nagad/Upay/Rocket (
              <span className="text-sm">Advanced Personal</span>) -{" "}
            </span>{" "}
            01660003040
          </p>
        </div>
      )}

      {loading ? (
        <button
          className={`font-semibold tracking-wider my-1 rounded-full cart-btn border border-gray-300 w-full py-3 ${btnhover}`}
        >
          Loading
        </button>
      ) : (
        <button
          // disabled={userPhone?.length !== 11}
          className={`font-semibold tracking-wider my-1 rounded-full border cart-btn border-gray-300 w-full py-3 ${btnhover}`}
          onClick={() => handleCheckout()}
        >
          অর্ডার কনফার্ম করুন
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
      />
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

  const deleteBtn = () => {
    toast("Remove from cart this item", {
      type: "warning",
      autoClose: 1000,
    });
  };

  const addCartBtn = () => {
    toast("Successfully you have to added cart", {
      type: "success",
      autoClose: 1000,
    });
  };

  const dispatch = useDispatch();
  const { design } = useTheme();

  const file = files.some((i: any) => i.cartId === index);

  return (
    <div
      key={item.id}
      className="flex justify-between space-x-1 last:border-0 border-b border-gray-400 py-2"
    >
      <div className="w-24">
        <img
          className="w-full h-auto "
          src={productImg + item.image[0]}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-x-2 gap-y-1 pl-2 w-full">
        <h3 className="text-black text-md whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] font-normal">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            {item.name}
          </Link>
        </h3>

        <div className="flex flex-col gap-x-2 gap-y-1 justify-start">
          {/* <p className='text-sm'>&#2547; {parseInt(item?.price)} * {item?.qty} </p> */}
          <div className="flex items-center">
            {item?.color ? (
              <div className="flex items-center gap-2">
                <p className="text-sm">Color: </p>
                <p
                  style={{ backgroundColor: item?.color }}
                  className="w-2 h-2 rounded-full ring-1 ring-offset-2 ring-gray-600"
                ></p>
              </div>
            ) : null}
            {item?.size ? (
              <p className="text-sm">
                Size: <span className="font-normal text-sm">{item?.size}</span>
              </p>
            ) : null}
            {item?.unit ? (
              <p className="text-sm">
                Unit:{" "}
                <span className="font-normal text-sm">
                  {item?.volume + " " + item?.unit}
                </span>
              </p>
            ) : null}
          </div>

          <div
            className="flex h-9 w-24 justify-between items-center rounded-md font-semibold"
            style={{
              backgroundColor: design?.header_color,
              color: design?.text_color,
            }}
          >
            <div
              onClick={() => {
                dispatch(decrementQty(item?.cartId));
                deleteBtn();
              }}
              className="hover:bg-gray-800 hover:rounded-md lg:cursor-pointer py-2 h-full w-8 flex justify-center items-center"
            >
              <MinusIcon color={design?.text_color} width={15} />
            </div>
            <div
              style={{ color: design?.text_color }}
              className={"text-gray-700"}
            >
              {item?.qty}
            </div>
            <div
              onClick={() => {
                dispatch(incrementQty(item?.cartId));
                addCartBtn();
              }}
              className="hover:bg-gray-800 hover:rounded-md lg:cursor-pointer py-2 h-full w-8 flex justify-center items-center"
            >
              <PlusIcon color={`${design?.text_color}`} width={15} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm justify-self-end flex items-center gap-x-2">
          <BDT />
          <span className="font-bold text-xl text-gray-500">
            {item?.price * item?.qty}
          </span>
        </p>
        <div className="justify-self-end flex items-center gap-x-2">
          <span
            onClick={() => dispatch(removeToCartList(item.cartId))}
            className="lg:cursor-pointer underline text-sm"
          >
            Remove
          </span>
          {/* {uploadFile?.status === "1" && (
            <button
              onClick={() => openModal()}
              className="text-2xl lg:cursor-pointer"
            >
              {file ? <FaEdit /> : <AiOutlineUpload />}
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};
