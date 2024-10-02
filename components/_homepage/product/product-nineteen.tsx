"use client";
// the hack was done above
import Card39 from "@/components/card/card39";
import SectionHeadingNineteen from "@/components/section-heading/section-heading-nineteen";
// hack for this
import useHeaderSettings from "@/utils/query/use-header-settings";

const ProductNineteen = ({ product, store_id }: any) => {
  const { data, error } = useHeaderSettings();
  const { title, title_color } = data?.data?.custom_design?.product?.[0] || {};
  if (error) {
    return <p> error from headersettings</p>;
  }

  return (
    <div style={{ background: "#f2efe4" }}>
      <div className="sm:container px-5">
        <div className="py-16">
          <SectionHeadingNineteen
            title={title || "PRODUCT CATEGORIES"}
            title_color={title_color || "#000"}
            subtitle={"Add products to weekly line up"}
          />
          <div className="grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-8 pt-10">
            {product
              ?.slice(0, 9)
              .map((data: any) => (
                <Card39 item={data} key={data?.id} store_id={store_id} />
              ))}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProductNineteen;
