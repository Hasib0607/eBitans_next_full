import useHeaderSettings from "@/utils/query/use-header-settings";
import Card47 from "../card/card47";
import SectionHeadingTwentyThree from "../section-heading/section-heading-twentythree";

const NewArrivalProductTwentyThree = ({ product, design, store_id }: any) => {
  const styleCss = `
    .active-cat {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
 `;

  const { data, error } = useHeaderSettings();
  const cDesign = data?.data?.custom_design || {};
  const newArrivalProduct = cDesign?.new_arrival_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = newArrivalProduct;
  if (error) {
    return <p>error from new arrival product</p>;
  }

  return (
    <div className="sm:container px-5 sm:py-10 py-5 w-full">
      <style>{styleCss}</style>
      <div className="">
        <div>
          <SectionHeadingTwentyThree
            title={title}
            title_color={title_color || "#000"}
            design={design}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {product?.slice(0, 8).map((productData: any) => (
          <div key={productData.id}>
            {" "}
            <Card47 item={productData} design={design} store_id={store_id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivalProductTwentyThree;
