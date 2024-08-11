"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import useTheme from "@/hooks/use-theme";
import { useRouter } from "next/navigation";
import { getPrice } from "@/utils/get-price";
import { clearCartList } from "@/redux/features/product.slice";
import { login } from "@/redux/features/auth.slice";
import httpReq from "@/utils/http/axios/http.service";
import { productImg } from "@/site-settings/siteUrl";
import Link from "next/link";
import Taka from "@/utils/taka";
import MyModal from "@/components/modal";
import { btnhover } from "@/site-settings/style";

const CheckOutElevenOrder = ({
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
  isButtonDisabled,
  setIsButtonDisabled,
}: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tax, setTax] = useState<any>(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState(null);
  let [isOpen, setIsOpen] = useState(false);
  let [files, setFiles] = useState([]);
  let [index, setIndex] = useState(null);

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

  const apiOrder = "https://admin.ebitans.com/api/v1/placeorder";

  const handleCheckout = async () => {
    setLoading(true);
    const cart = updatedCartList.map((item: any) => ({
      id: item.id,
      quantity: item.qty,
      // discount:
      //   item.regular_price -
      //   getPrice(item.regular_price, item.discount_price, item.discount_type),
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
    // formData.append("total", total + tax + parseInt(shipping_area) - couponDis);
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
      data.total &&
      data.payment_type &&
      data.product &&
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
                      router.push("/thank-you");
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
          .then((response: any) => {
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
                router.push("/thank-you");
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

  // facebook pixel
  // useEffect(() => {
  //   Purchase(parseInt(total + tax), "BDT");
  //   AddToCart();
  // }, [total, tax]);

  return (
    <div className="bg-gray-100 sm:rounded-md">
      <style>{styleCss}</style>
      {/* {error && <SnackBar open={true} msg={error} />} */}
      <h3 className="text-base text-black bg-[#FAEBD7] p-5">Products</h3>
      {cartList ? (
        <>
          <div className="my-5">
            <div className=" flex flex-col justify-between pt-5">
              {/* Replace with your content */}
              <div className="px-2 h-2/3 overflow-y-auto">
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

      <div className="my-5 text-gray-500 px-5" style={{ fontWeight: 500 }}>
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
      </div>
      <div className="h-[1px] w-full bg-gray-400 mt-4 mb-2"></div>
      <div className="flex justify-between items-center text-black font-semibold px-5">
        <p>Total</p>
        {shipping_area === "--Select Area--" || shipping_area === null ? (
          <p>{<Taka tk={parseInt(total + tax) - couponDis} />}</p>
        ) : (
          <p>
            {
              <Taka
                tk={parseInt(total + tax) + parseInt(shipping_area) - couponDis}
              />
            }
          </p>
        )}
      </div>

      {loading ? (
        <div className="w-full px-5 py-3 overflow-hidden">
          <button
            className={`font-semibold tracking-wider rounded-full cart-btn border border-gray-300 w-full py-3 ${btnhover}`}
          >
            Loading
          </button>
        </div>
      ) : (
        <div className="w-full px-5 py-3 overflow-hidden">
          <button
            className={`font-semibold tracking-wider my-1 rounded-full border cart-btn border-gray-300 w-full py-3 ${btnhover}`}
            onClick={() => handleCheckout()}
          >
            {" "}
            Place Order{" "}
          </button>
        </div>
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

export default CheckOutElevenOrder;

const Single = ({ item, setIsOpen, files, index }: any) => {
  const { module } = useTheme();

  const uploadFile = module?.find((item: any) => item?.modulus_id === 104);

  function openModal() {
    setIsOpen(true);
  }

  const file = files.some((i: any) => i.cartId === index);

  return (
    <div
      key={item.id}
      className="flex flex-col sm:flex-row justify-start sm:justify-between space-x-1 border-b-2 border-gray-300 py-2 "
    >
      <div className="flex gap-2">
        <div className="w-20 relative">
          <img className="w-20 h-20" src={productImg + item.image[0]} alt="" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex justify-center items-center">
            <p>{item?.qty}</p>
          </div>
        </div>
        <div className="flex flex-col gap-x-2 gap-y-1 pl-2 justify-start">
          <h3 className="text-black text-md  font-normal">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              {item?.name.slice(0, 15)}
              {item?.name?.length > 15 && "..."}
            </Link>
          </h3>
          {/* <p className='text-sm'>&#2547; {parseInt(item?.price)} * {item?.qty} </p> */}
          <div className="flex items-center mt-1">
            {item?.color ? (
              <div className="flex items-center gap-2 pr-2">
                <p className="font-semibold text-sm">Color: </p>
                <p
                  style={{ backgroundColor: item?.color }}
                  className="w-4 h-4 rounded-full ring-1 ring-offset-2 ring-gray-600"
                ></p>
              </div>
            ) : null}
            {item?.size ? (
              <p className="font-semibold text-sm">
                Size: <span className="font-normal text-sm">{item?.size}</span>
              </p>
            ) : null}
            {item?.unit ? (
              <p className="font-semibold text-sm">
                Unit:{" "}
                <span className="font-normal text-sm">
                  {item?.volume + " " + item?.unit}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex gap-x-2 items-center justify-end">
        {uploadFile?.status === "1" && (
          <button
            onClick={() => openModal()}
            className="px-4 py-1 bg-green-500 rounded-md"
          >
            {file ? "Edit" : "Upload"}
          </button>
        )}
        <div className="text-md font-semibold">
          <Taka tk={item?.price * item?.qty} />
        </div>
      </div>
    </div>
  );
};
