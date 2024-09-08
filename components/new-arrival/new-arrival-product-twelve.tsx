import useHeaderSettings from "@/utils/query/use-header-settings";
import Card17 from "../card/card17";
import SectionHeadingSeven from "../section-heading/section-heading-seven";

const NewArrivalProductTwelve = ({ product, design, store_id }: any) => {
  let arrayItem = product.slice(0, 10);
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
        title={title}
        subtitle={""}
        titleColor={title_color || "#000"}
      />
      <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 lg2:grid-cols-4 md:grid-cols-3 gap-5 ">
        {arrayItem?.map((productData: any) => (
          <Card17
            item={productData}
            design={design}
            store_id={store_id}
            key={productData.id}
          />
        ))}
      </div>
    </div>
  );
};

export default NewArrivalProductTwelve;
