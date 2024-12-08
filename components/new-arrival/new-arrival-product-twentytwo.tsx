"use client";
import useHeaderSettings from "@/utils/query/use-header-settings";
import Card46 from "../card/card46";
import SectionHeadingTwentyTwo from "../section-heading/section-heading-twentytwo";

const NewArrivalProductTwentyTwo = ({ product, store_id }: any) => {
  const { data, error } = useHeaderSettings();
  const cDesign = data?.custom_design || {};
  const newArrivalProduct = cDesign?.new_arrival?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = newArrivalProduct;
  if (error) {
    return <p>error from new arrival product</p>;
  }
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <div className="flex justify-center ">
        <SectionHeadingTwentyTwo
          text={title || "Shopping Everyday"}
          title_color={title_color || "#000"}
        />
      </div>
      <div className="flex justify-center">
        <div
          className="mt-2 md:w-[5%] w-[120px]"
          style={{ border: "2px solid black" }}
        ></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 container mt-10 gap-6">
        {product
          ?.slice(0, 10)
          .map((item: any) => (
            <Card46 item={item} key={item?.id} store_id={store_id} />
          ))}
      </div>
    </div>
  );
};

export default NewArrivalProductTwentyTwo;
