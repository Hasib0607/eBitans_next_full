import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsBagPlus } from "react-icons/bs";
import "./product-card-one.css";
// import Badge from '../utils/Badge';
import Details from "@/components/_product-details-page/product-details/three/details";
import QuikView from "@/components/quick-view";
import useTheme from "@/hooks/use-theme";
import { addToCartList, incrementQty } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Taka from "@/utils/taka";
import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductCardOne = ({ item }: any) => {
  const { makeid, store_id } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<any>({});
  const [camp, setCamp] = useState<any>(null);

  const price = getPrice(
    item?.regular_price,
    item?.discount_price,
    item?.discount_type
  );
  const secondImg = item?.image[1] ? item?.image[1] : item?.image[0];

  const cartList = useSelector((state: any) => state.cart.cartList);

  let productGetPrice = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const campPrice = Number(
    getPrice(
      productGetPrice,
      parseInt(camp?.discount_amount),
      camp?.discount_type
    )
  );

  useEffect(() => {
    async function handleCampaign() {
      try {
        const response = await getCampaignProduct(item, store_id);
        if (!response?.error) {
          setCamp(response);
        } // the API response object
      } catch (error) {
        console.error(error);
      }
    }

    handleCampaign();
  }, [item, store_id]);

  useEffect(() => {
    setResult(cartList?.find((c: any) => c.id === item.id));
  }, [cartList, item.id]);

  const filterOfferProduct = (item: any) => {
    let cartItem = {};
    let productDetails = {
      id: item?.id,
      store_id,
    };
    toast("Added to Cart", {
      type: "success",
      autoClose: 1000,
    });
    httpReq.post("get/offer/product", productDetails).then((res) => {
      if (!res?.error) {
        let itemRegularPrice = getPrice(
          item?.regular_price,
          item?.discount_price,
          item?.discount_type
        );
        let campaignPrice = getPrice(
          itemRegularPrice,
          parseInt(res?.discount_amount),
          res?.discount_type
        );

        if (res?.discount_amount === null) {
          cartItem = {
            cartId: makeid(100),
            price: itemRegularPrice,
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            ...item,
          };
        } else {
          cartItem = {
            cartId: makeid(100),
            price: campaignPrice,
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            ...item,
          };
        }
      } else {
        cartItem = {
          cartId: makeid(100),
          price: price,
          color: null,
          size: null,
          additional_price: null,
          volume: null,
          unit: null,
          ...item,
        };
      }
      dispatch(addToCartList({ ...cartItem }));
    });
  };

  const add_to_cart = (item: any) => {
    if (item?.variant.length !== 0) {
      setOpen(!open);
    } else {
      filterOfferProduct(item);
      if (store_id === 3512) {
        router.push("/checkout");
      }
    }
  };

  return (
    <div className="group lg:cursor-pointer">
      <div className="drop-shadow-xl w-full relative">
        {/* out of stock  */}
        {item?.quantity === "0" && (
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1]">
              <p className="bg-red-600 text-white px-2 py-1 w-max">
                Out of Stock
              </p>
            </div>
          </Link>
        )}

        <figure className="min-w-full h-auto relative overflow-hidden ">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <motion.img
              whileHover={{
                scale: 1.25,
                transition: { duration: 1 },
              }}
              exit={{
                scale: 1,
                transition: { duration: 1 },
              }}
              src={productImg + item?.image[0]}
              alt="Shoes"
              className="w-full h-full group-hover:hidden group-hover:scale-105 transition-all duration-500 ease-linear "
            />
          </Link>
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <motion.img
              whileHover={{
                scale: 1.25,
                transition: { duration: 1 },
              }}
              exit={{
                scale: 1,
                transition: { duration: 1 },
              }}
              src={productImg + secondImg}
              alt="Shoes"
              className="w-full h-full group-hover:block group-hover:scale-105 transition-all duration-500 ease-linear hidden "
            />
          </Link>
          <div className="absolute hidden gap-2 top-[45%] group-hover:flex justify-center left-0 right-0">
            <div onClick={() => setOpen(!open)} className="">
              <HoverIcon text={"Quick View"}>
                <EyeIcon className="h-5 w-5 text-2xl font-serif font-semibold" />
              </HoverIcon>
            </div>
          </div>
          {camp?.status !== "active" &&
          (item.discount_type === "no_discount" ||
            item.discount_price === "0.00") ? (
            ""
          ) : (
            <div className="absolute z-[3] top-2 right-2 bg-[#ff576d] px-[5px] py-[2px] h-[22px] rounded-md text-white flex justify-center items-center text-xs font-semibold">
              {" "}
              Save
              {(camp?.discount_type || item.discount_type) === "fixed" &&
                " ৳"}{" "}
              {parseInt(
                campPrice ? camp?.discount_amount : item?.discount_price
              )}{" "}
              {(camp?.discount_type || item.discount_type) === "percent" && "%"}
            </div>
          )}
        </figure>
        <div className="card-body p-4 bg-white">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <p className="text-xs ">
              {item?.name?.slice(0, 18)}{" "}
              {item?.name?.length > 18 ? "..." : null}
            </p>
          </Link>
          <h2 className="tracking-widest font-normal text-sm text-gray-600">
            <div
              dangerouslySetInnerHTML={{
                __html: item?.description?.slice(0, 18),
              }}
              className="apiHtml"
            ></div>
          </h2>

          <h6 className="text-lg font-medium flex items-center">
            <Taka
              tk={camp?.status === "active" ? campPrice : productGetPrice}
            />
            <div className="line-through text-sm ml-2">
              {camp?.status !== "active" &&
              (item.discount_type === "no_discount" ||
                item.discount_price === "0.00") ? (
                " "
              ) : (
                <p>
                  {" "}
                  <Taka tk={Math.trunc(item.regular_price)} />
                </p>
              )}
            </div>
          </h6>

          {result?.qty ? (
            <div
              onClick={() => dispatch(incrementQty(result?.cartId))}
              className="absolute bottom-6 right-2"
            >
              <HoverIcon text={"Add to Cart"}>
                <BsBagPlus className="h-5 w-5 text-2xl font-serif font-bold" />
              </HoverIcon>
            </div>
          ) : !parseInt(item?.variant) ? (
            <div
              onClick={() => add_to_cart(item)}
              className="absolute bottom-6 right-2"
            >
              <HoverIcon text={"Add to Cart"}>
                <BsBagPlus className="h-5 w-5 text-2xl font-serif font-bold" />
              </HoverIcon>
            </div>
          ) : (
            <Link
              href={"/product/" + item?.id + "/" + item?.slug}
              className="absolute bottom-6 right-2"
            >
              <HoverIcon text={store_id === 3512 ? "Buy Now" : "Add to Cart"}>
                <BsBagPlus className="h-5 w-5 text-2xl font-serif font-bold" />
              </HoverIcon>
            </Link>
          )}
        </div>
      </div>

      <QuikView open={open} setOpen={setOpen}>
        <div className="p-5">
          <Details data={{ product_id: item?.id }} />
        </div>
      </QuikView>
    </div>
  );
};

export default ProductCardOne;

export const HoverIcon = ({ text, children }: any) => {
  return (
    <motion.div
      whileHover={{ y: -7 }}
      className="p-3 icon rounded-full bg-orange-50 relative hover:bg-orange-700 hover:text-white transition-all duration-500  ease-linear"
    >
      {children}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: -5 }}
        transition={{ delay: 1 }}
        className="bg-orange-700 rounded-md shadow-sm pb-3 pt-1 font-semibold absolute -top-9 m-1 -left-8 px-2  invisible child_icon translate-y-6 transition-all duration-500 ease-in-out text-center text-xs text-gray-300"
      >
        {text}
      </motion.div>
    </motion.div>
  );
};
