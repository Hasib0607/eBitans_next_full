"use client";
import ProductCardThreeMultipleCard from "@/components/card/product-card/product-card-three-multiple";
import ProductCardThreeSecondSinglePage from "@/components/card/product-card/product-card-three-second-single";
import ProductCardThreeSingleCard from "@/components/card/product-card/product-card-three-single";
import SectionHeadingSeven from "@/components/section-heading/section-heading-seven";
import useHeaderSettings from "@/utils/query/use-header-settings";

const FeatureProductSeven = ({ feature_product, store_id }: any) => {
  const { data, error } = useHeaderSettings();
  if (error) return <p>error from header-settings</p>;
  const cDesign = data?.data?.custom_design || {};
  const featuredProduct = cDesign?.feature_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = featuredProduct;

  return (
    <div className="container px-5 bg-white py-8">
      <SectionHeadingSeven titleColor={title_color} title={title} />
      <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 gap-3 md:gap-3">
        <ProductCardThreeSingleCard
          item={feature_product[0]}
          store_id={store_id}
        />
        <ProductCardThreeMultipleCard
          item1={feature_product[1]}
          item3={feature_product[2]}
          store_id={store_id}
        />
        <ProductCardThreeSecondSinglePage
          item={feature_product[3]}
          store_id={store_id}
        />
      </div>
    </div>
  );
};

export default FeatureProductSeven;
