import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSearchCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/three/details";
import QuikView from "../quick-view";
import "./card.css";

const Card23 = ({ item }: any) => {
  const [open, setOpen] = useState(false);
  const [camp, setCamp] = useState<any>(null);

  const { design, makeid, store_id } = useTheme();
  // const cartList = useSelector((state) => state.cart.cartList)
  const dispatch = useDispatch();
  const card7CustomStyle = `      

.card7SearchIcon{
    height: 20px;
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
}
.card7SearchIcon:hover{
    color:${design?.header_color};
}

.mainDivHover:hover{
    border:1px solid ${design?.header_color}
}
`;

  const unitAddPrice =
    parseInt(item.regular_price) +
    (item?.variant[0]?.unit && item?.variant[0]?.additional_price
      ? parseInt(item?.variant[0]?.additional_price)
      : 0);
  const productGetPrice = getPrice(
    unitAddPrice,
    item.discount_price,
    item.discount_type
  );
  const campPriceUnit = getPrice(
    productGetPrice,
    parseInt(camp?.discount_amount),
    camp?.discount_type
  );

  const price = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const campPrice = getPrice(
    price,
    parseInt(camp?.discount_amount),
    camp?.discount_type
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

  const filterOfferProduct = (item: any) => {
    let cartItem = {};
    let productDetails = {
      id: item?.id,
      store_id,
    };
    toast("Added to Cart", {
      type: "success",
    });
    httpReq.post("get/offer/product", productDetails).then((res) => {
      if (!res?.error) {
        if (item?.variant[0]?.unit && store_id === 2109) {
          cartItem = {
            cartId: makeid(100),
            price: campPriceUnit,
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            variant_quantity: item?.variant[0]?.quantity,
            variantId: item?.variant[0]?.id,
            ...item?.variant[0],
            ...item,
          };
        } else {
          cartItem = {
            cartId: makeid(100),
            price: campPrice,
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            ...item,
          };
        }
      } else {
        if (item?.variant[0]?.unit && store_id === 2109) {
          cartItem = {
            cartId: makeid(100),
            price: productGetPrice,
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            variant_quantity: item?.variant[0]?.quantity,
            variantId: item?.variant[0]?.id,
            ...item?.variant[0],
            ...item,
          };
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
      }
      dispatch(addToCartList({ ...cartItem }));
    });
  };

  let add_cart_item = (item: any) => {
    if (
      item?.variant.length !== 0 &&
      !item?.variant[0]?.unit &&
      store_id === 2109
    ) {
      setOpen(!open);
    } else if (item?.variant.length !== 0 && store_id !== 2109) {
      setOpen(!open);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
        className="w-full bg-white relative rounded-lg overflow-hidden mainDivHover border card7Hover"
        style={{ width: "100%" }}
      >
        {/* out of stock  */}
        {item?.quantity === "0" && (
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className="absolute bottom-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
              <p className="bg-red-400 text-white px-2 py-1 w-max absolute bottom-0">
                Out of Stock
              </p>
            </div>
          </Link>
        )}
        <style>{card7CustomStyle}</style>
        <div className="w-full   block relative rounded overflow-hidden ">
          {/* <p className='absolute bg-black rounded-lg text-white top-2 left-2 px-2 py-1'>NEW</p> */}
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <img
              className="min-w-full h-auto scale-110"
              src={productImg + item.image[0]}
              alt=""
            />
          </Link>

          <div className="justify-center hidden lg:flex">
            <div className="w-[60%] lg:absolute -bottom-2   mx-auto  px-1 quick3 font-normal text-md pb-2 text-black text-md border rounded-full items-center">
              <div className="flex justify-center items-center">
                <div
                  className="mr-2 lg:cursor-pointer"
                  onClick={() => add_cart_item(item)}
                >
                  <ShoppingBagIcon className="card7SearchIcon" />
                </div>
                <div className="border-r-2 border-gray-500 h-[20px]"></div>
                <div
                  className="lg:cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  <IoSearchCircleOutline className="card7SearchIcon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link href={"/product/" + item?.id + "/" + item?.slug} className="p-5">
          <div className="flex justify-center px-2">
            <p className="mb-3 menu-hover font-six font-base text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
              {item?.name}
            </p>
          </div>
          <div className="flex justify-center">
            <Rate rating={item?.rating} />
          </div>
          <div className="flex justify-center items-center ">
            <div className="flex gap-x-2 px-2">
              <div className="text-base font-semibold">
                <BDT />
                {camp?.status === "active"
                  ? campPrice
                  : store_id === 2109
                  ? productGetPrice
                  : price}
              </div>
              {camp?.status !== "active" &&
              (item.discount_type === "no_discount" ||
                item.discount_price === "0.00") ? (
                " "
              ) : (
                <div className="line-through text-gray-400 ">
                  <p>
                    {" "}
                    <BDT price={Math.trunc(item.regular_price)} />
                  </p>
                </div>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
      <QuikView open={open} setOpen={setOpen}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </>
  );
};

export default Card23;
