"use client";
import useTheme from "@/hooks/use-theme";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import Taka from "@/utils/taka";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSearchCircleOutline } from "react-icons/io5";
import "./card.css";

const Card24 = ({ item }: any) => {
  const { design, store_id } = useTheme();

  const [cardBorder, setCardBorder] = useState(false);
  const [camp, setCamp] = useState<any>(null);

  const productGetPrice = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const campPrice: any = Number(
    getPrice(
      productGetPrice,
      parseInt(camp?.discount_amount),
      camp?.discount_type
    )
  );

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

  const customStyle = `
.searchIconCard24:hover{
    background-color:${design?.header_color};
    color:${design?.text_color};
}
`;
  // console.log(item)

  return (
    <>
      <Link href={"/product/" + item?.id + "/" + item?.slug}>
        <div
          className="p-6 group rounded-md bg-white shadow-lg "
          style={{
            border: cardBorder
              ? `1px solid ${design?.header_color}`
              : `1px solid #ccc`,
          }}
          onMouseEnter={() => setCardBorder(true)}
          onMouseLeave={() => setCardBorder(false)}
        >
          <style>{customStyle}</style>

          <div className="flex justify-center ">
            <div className="flex sm:flex-row flex-col md:max-w-xl   ">
              <div className=" border flex items-center relative">
                <img
                  className="h-48 w-48  "
                  src={productImg + item?.image[0]}
                  alt="Mountain"
                />

                <div className="bg-white hidden border-1 border-gray-300 rounded-full h-10 w-10 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] group-hover:flex  items-center justify-center searchIconCard24 group  font-thin lg:cursor-pointer">
                  <IoSearchCircleOutline className="h-4" />
                </div>
              </div>
              <div className="sm:px-5 flex flex-col justify-start mt-6">
                <div
                  className="font-sans text-sm font-normal antialiased card5itemCategory"
                  style={{
                    height: "20px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "130px",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.category}
                </div>
                <div
                  className=" text-base antialiased  font-semibold"
                  style={{
                    height: "30px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "130px",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item?.name}
                </div>

                <Rate rating={item?.rating} />
                <div className="flex gap-4 xl:gap-4 md:gap-4 lg:gap-4">
                  <div className="text-base font-semibold">
                    <Taka />{" "}
                    {camp?.status === "active" ? campPrice : productGetPrice}
                  </div>
                  <div className="line-through text-gray-400">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card24;
