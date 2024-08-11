import shape from "@/assets/img/shape.png";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/three/details";
import QuikView from "../quick-view";

const Card54 = ({ item }: any) => {
  const { design, makeid, store_id } = useTheme();
  const [camp, setCamp] = useState<any>(null);

  const dispatch = useDispatch();

  const [id, setId] = useState(0);

  const vPrice = item?.variant?.map((item: any) => item?.additional_price);
  const smallest = Math.min(...vPrice);
  const largest = Math.max(...vPrice);

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  // const [id, setId] = useState(0)
  const [view, setView] = useState(false);

  const unitAddPrice =
    item.regular_price +
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
  const campPrice: any = getPrice(
    price,
    parseInt(camp?.discount_amount),
    camp?.discount_type
  );

  console.log(camp, "camp");

  console.log({
    unitAddPrice,
    productGetPrice,
    campPriceUnit,
    campPrice,
    price,
  });

  useEffect(() => {
    async function handleCampaign() {
      try {
        const response: any = await getCampaignProduct(item, store_id);
        if (!response?.error) {
          setCamp(response);
        } // the API response object
      } catch (error) {
        console.error(error);
      }
    }

    handleCampaign();
  }, [item, store_id]);

  const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color-thirty {
        color:  ${design?.header_color};
    }
    .text-hover:hover {
        color: ${design?.header_color};
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn:hover {
        color:  ${bgColor};
        background: white;
        border: 1px solid ${bgColor};
    }
   
    .view-eye:hover .quick-view {
        display: block;
        background: white;
      }
    .image-div:hover .image-hover {
        display: none;
       
      }
    .image-div:hover .image-hover-two {
        display: block;
       
      }
      .card-overlay-thirty{
        background-color: ${bgColor};
        opacity: 0;
      }
      .overlay-group:hover .card-overlay-thirty{
        background-color: ${bgColor};
        opacity: .5;
      }

  `;

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

  const add_cart_item = () => {
    if (
      item?.variant.length !== 0 &&
      !item?.variant[0]?.unit &&
      store_id === 2109
    ) {
      setView(!view);
    } else if (item?.variant.length !== 0 && store_id !== 2109) {
      setView(!view);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <div className="group overlay-group relative px-2">
      {/* out of stock  */}
      {item?.quantity === "0" && (
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[3]">
            <p className="bg-red-600 text-white px-2 py-1 w-max absolute left-0">
              Sold Out
            </p>
          </div>
        </Link>
      )}
      <div className="">
        <style>{styleCss}</style>
        <div className="mt-5 relative overflow-hidden">
          <div className="relative overflow-hidden w-full ">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              <img
                src={productImg + item.image[0]}
                alt=""
                className="h-auto min-w-full"
              />
            </Link>
            {item.discount_price === "0.00" ||
            item.discount_type === "no_discount" ? (
              ""
            ) : (
              <div className="h-10 absolute top-2 right-2 z-[2]">
                <img src={shape.src} alt="" className="h-full" />
                <p className="text-[11px] text-white absolute top-2 left-3 leading-[12px]">
                  {item.discount_type === "fixed" ? "BDT" : ""}{" "}
                  {Math.trunc(item.discount_price)}{" "}
                  {item.discount_type === "percent" ? "% off" : ""}
                </p>
              </div>
            )}
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              <div className="lg:absolute card-overlay-thirty lg:z-[1] lg:group-hover:w-full w-1/2 h-full left-0 bottom-0 duration-700"></div>
            </Link>
            <div
              onClick={add_cart_item}
              className="lg:absolute lg:group-hover:bottom-0 lg:-bottom-5 duration-700 lg:opacity-0 w-full z-[2] lg:group-hover:opacity-100 bg-black text-white searchHover flex px-2 py-2 justify-center gap-1 items-center lg:cursor-pointer"
            >
              <p className="lg:scale-0 lg:group-hover:scale-100 duration-700 ">
                {store_id === 1187 ? "অর্ডার করুন" : "Add to Cart"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 py-3">
            <div>
              <Link href={"/category/" + item?.category_id}>
                <p className="text-gray-500 text-lg">{item?.category}</p>
              </Link>
            </div>
            <div className="font-bold text-xl flex justify-between items-center flex-wrap">
              <Link href={"/product/" + item?.id + "/" + item?.slug}>
                {" "}
                <h1 className="text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                  {item?.name}
                </h1>{" "}
              </Link>
              <div className="flex gap-x-1 items-center">
                <div>
                  <Rate rating={item?.rating} />
                </div>
                <div className="text-gray-500 sm:text-sm text-xs">
                  ({item?.number_rating})
                </div>
              </div>
            </div>

            {item?.variant[0]?.unit && store_id === 2109 && (
              <div>
                <p>
                  <b>Unit:</b> {item?.variant[0]?.volume}{" "}
                  {item?.variant[0]?.unit}
                </p>
              </div>
            )}
            {store_id !== 2875 ? (
              <div className=" font-semibold flex justify-between items-center gap-2 w-full ">
                <div className="flex items-center flex-wrap gap-2">
                  {camp?.status !== "active" &&
                  (item.discount_type === "no_discount" ||
                    item.discount_price === "0.00") ? (
                    ""
                  ) : (
                    <p className="line-through text-xs text-color-thirty">
                      {" "}
                      <BDT price={Math.trunc(item.regular_price)} />
                    </p>
                  )}
                  <p className="text-sm py-1 rounded-lg">
                    <BDT
                      price={
                        camp?.status === "active" ? campPrice : productGetPrice
                      }
                    />
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {item?.variant?.length !== 0 && (
                  <div className="flex items-center gap-1">
                    <p className="text-color text-sm font-bold">
                      <BDT />
                      {(campPrice ? campPrice : productGetPrice) + smallest}
                    </p>
                    {largest > smallest && (
                      <p className="text-color text-sm font-bold">
                        {" "}
                        - <BDT />{" "}
                        {(campPrice ? campPrice : productGetPrice) + largest}
                      </p>
                    )}
                  </div>
                )}
                {item?.variant?.length === 0 && (
                  <div className="flex justify-start items-center gap-x-4">
                    <div className="text-color text-sm font-bold flex justify-start items-center gap-4">
                      <BDT />
                      {camp?.status === "active"
                        ? campPrice
                        : store_id === 2109
                        ? productGetPrice
                        : price}{" "}
                      {camp?.status !== "active" &&
                      (item.discount_type === "no_discount" ||
                        item.discount_price === "0.00") ? (
                        " "
                      ) : (
                        <span className="text-gray-500 font-thin line-through text-sm font-seven">
                          <BDT />
                          {item.regular_price}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* for modal open  */}
      <QuikView open={view} setOpen={setView} design={design}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card54;
