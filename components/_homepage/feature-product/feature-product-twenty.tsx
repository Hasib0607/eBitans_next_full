"use client";
import Card44 from "@/components/card/card44";
import SectionHeadingEighteen from "@/components/section-heading/section-heading-eighteen";
import useHeaderSettings from "@/utils/query/use-header-settings";

const FeatureProductTwenty = ({ feature_product, store_id, design }: any) => {
  const { data, error } = useHeaderSettings();
  if (error) return <p>error from header-settings</p>;
  const cDesign = data?.data?.custom_design || {};
  const featuredProduct = cDesign?.feature_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = featuredProduct;
  return (
    <div className="sm:container px-5 sm:py-10 py-5 relative">
      <SectionHeadingEighteen
        title={title}
        subtitle={""}
        titleColor={title_color}
      />
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
        {feature_product
          ?.slice(0, 3)
          ?.map((productData: any) => (
            <Card44
              item={productData}
              key={productData.id}
              store_id={store_id}
              design={design}
            />
          ))}
      </div>
    </div>
  );
};

export default FeatureProductTwenty;
