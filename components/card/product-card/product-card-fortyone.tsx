import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useTheme from "@/hooks/use-theme";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Taka from "@/utils/taka";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const ProductCardFortyOne = ({ item }: any) => {
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
        </figure>
        <div className="card-body p-4 bg-white">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <p className="text-center">
              {item?.name?.slice(0, 18)}{" "}
              {item?.name?.length > 18 ? "..." : null}
            </p>
          </Link>

          <h6 className="text-lg font-medium flex items-center justify-center">
            <Taka
              tk={camp?.status === "active" ? campPrice : productGetPrice}
            />
          </h6>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {item?.image?.map((imgSrc: string, index: number) => (
              <img
                key={index}
                src={productImg + imgSrc}
                alt=""
                className="w-8 lg:w-12 rounded border border-red-700"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardFortyOne;

