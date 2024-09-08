import Card64 from "@/components/card/card64";
import useHeaderSettings from "@/utils/query/use-header-settings";
import img from "./bg-img/37/MARGIN.png";

const ProductThirtySeven = ({ product, design, store_id }: any) => {
  const { data, error } = useHeaderSettings();
  const { title, title_color } = data?.data?.custom_design?.product?.[0] || {};
  if (error) {
    return <p> error from headersettings</p>;
  }

  if (product.length === 0) {
    return null;
  }
  return (
    <div className="shadow-lg py-5 sm:py-10 rounded-sm bg-[#F1F9DD]">
      <div className="container px-5">
        <div>
          <img src={img.src} alt="margin" className="mx-auto" />
          <h1 style={{ color: title_color }} className="text-2xl text-center">
            {title || "PRODUCTS"}
          </h1>
        </div>
        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-3 lg:grid-cols-5 xl:grid-cols-6 justify-center">
            {product
              ?.slice(0, 12)
              .map((item: any, id: any) => (
                <Card64
                  item={item}
                  key={id}
                  design={design}
                  store_id={store_id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductThirtySeven;
