"use client";
import Card5 from "@/components/card/card5";
import SectionHeadingFive from "@/components/section-heading/section-heading-five";
import useHeaderSettings from "@/utils/query/use-header-settings";

const ProductFive = ({ product, store_id }: any) => {
  const { data, error } = useHeaderSettings();
  console.log(data);
  const { title, title_color } = data?.data?.custom_design?.product?.[0] || {};
  if (error) {
    return <p> error from headersettings</p>;
  }

  if (product.length === 0) {
    return;
  }
  return (
    <div className="shadow-lg py-5 sm:py-10 rounded-sm bg-white ">
      <div className="container px-5 mx-auto">
        <SectionHeadingFive
          title={title || "Product"}
          title_color={title_color || "#000"}
        />
        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4 justify-center">
            {product
              ?.slice(0, 12)
              .map((item: any, id: any) => (
                <Card5 item={item} key={id} store_id={store_id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFive;
