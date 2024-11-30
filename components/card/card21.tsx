import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import QuikView from "../quick-view";
import Details from "../product-quick-view-details/details";

const Card21 = ({ item }: any) => {
  const [open, setOpen] = useState(false);
  const [camp, setCamp] = useState<any>(null);

  const { design, store_id, makeid } = useTheme();
  const dispatch = useDispatch();

  const productGetPrice = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const campPrice = getPrice(
    productGetPrice,
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
          price: productGetPrice,
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

  const router = useRouter();

  const addBtn = (item: any) => {
    if (item?.variant.length !== 0) {
      setOpen(!open);
    } else {
      filterOfferProduct(item);
      if (store_id === 3144) {
        router.push("/checkout");
      }
    }
  };

  const customStyle = `

    .btnCustom {
        transition:2s
    }
    .btnCustom:hover {
        transform: translateY(-20px)
    }
    `;

  return (
    <>
      <div className="group relative overflow-hidden rounded-[20px] h-fit border hover:shadow-lg ">
        {/* out of stock  */}
        {item?.quantity === "0" && (
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className="absolute top-0 right-0 w-full h bg-black bg-opacity-50 z-[1]">
              <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                Sold Out
              </p>
            </div>
          </Link>
        )}
        <style>{customStyle}</style>
        <div className="w-full flex justify-center overflow-hidden relative">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            {" "}
            <img
              src={productImg + item?.image[0]}
              alt="Mountain"
              className=" p-2  min-w-[100%] group-hover:scale-105 transition-all duration-300 ease-linear"
            />
          </Link>
          <div
            className="absolute top-1/2 -translate-y-1/2 rounded-xl hidden group-hover:flex h-[60px] px-3 left-1/2 -translate-x-1/2  justify-start items-center bg-white"
            onClick={() => setOpen(!open)}
          >
            <AiOutlineEye
              className="text-3xl"
              style={{ color: design?.text_color }}
            />
          </div>
        </div>
        <div className="">
          <div className="p-5 bg-white ">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              <h6
                className="text-lg font-bold"
                style={{
                  height: "30px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  width: "130px",
                  textOverflow: "ellipsis",
                }}
              >
                {item?.name}
              </h6>
              <p
                className="text-sm "
                style={{
                  height: "30px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  width: "130px",
                  textOverflow: "ellipsis",
                }}
              >
                {item?.category}
              </p>
            </Link>

            <Rate rating={item?.rating} />
            <div className="flex justify-between items-center gap-2 flex-wrap">
              <div className="flex gap-4 xl:gap-4 md:gap-4 lg:gap-4">
                <div className="text-base font-semibold">
                  <BDT
                    price={
                      camp?.status === "active" ? campPrice : productGetPrice
                    }
                  />
                </div>
                <div className="line-through ">
                  {camp?.status !== "active" &&
                  (item.discount_type === "no_discount" ||
                    item.discount_price === "0.00") ? (
                    " "
                  ) : (
                    <p>
                      {" "}
                      <BDT price={Math.trunc(item.regular_price)} />
                    </p>
                  )}
                </div>
              </div>
              <div>
                <button
                  className="rounded-lg py-2 px-6 btnCustom font-bold flex gap-4 justify-between item-center"
                  onClick={() => addBtn(item)}
                  style={{
                    background: design?.header_color,
                    color: design?.text_color,
                  }}
                >
                  <AiOutlineShoppingCart className="mt-1 ml-2 xl:ml-0  text-base" />{" "}
                  {store_id === 3144 ? "Order Now" : "Add"}{" "}
                </button>
              </div>
            </div>
          </div>
        </div>

        <span className="absolute  bg-gray-800 text-white p-2 text-sm rounded-tl-[20px] rounded-br-[20px] top-0 right-[380px] pl-6 bottom-50 w-[80px] left-0">
          New
        </span>
      </div>

      <QuikView open={open} setOpen={setOpen}>
        <Details
          item={item}
          updateData={{
            product_id: item?.id,
            slug: item.slug,
            store_id,
          }}
        />
      </QuikView>
    </>
  );
};

export default Card21;
