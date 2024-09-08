import SectionHeadingSeven from "@/components/section-heading/section-heading-seven";
import useHeaderSettings from "@/utils/query/use-header-settings";
import Card12 from "../card/card12";

const NewArrivalProductSeven = ({ product, store_id }: any) => {
  const { data, error } = useHeaderSettings();
  const cDesign = data?.data?.custom_design || {};
  const newArrivalProduct = cDesign?.new_arrival_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = newArrivalProduct;
  if (error) {
    return <p>error from new arrival product</p>;
  }
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <SectionHeadingSeven
        title={title || "New Arrivals"}
        subtitle={""}
        titleColor={title_color || "#000"}
      />

      <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 gap-2 ">
        {product
          ?.slice(0, 10)
          .map((productData: any) => (
            <Card12
              store_id={store_id}
              item={productData}
              key={productData.id}
            />
          ))}
      </div>
    </div>
  );
};

export default NewArrivalProductSeven;
