import Card65 from "@/components/card/card65";
import useHeaderSettings from "@/utils/query/use-header-settings";

const BestSellerThirtyEight = ({
  best_sell_product,
  design,
  store_id,
}: any) => {
  if (best_sell_product.length === 0) {
    return null;
  }

  const { data, error } = useHeaderSettings();
  if (error) return <p>error from header-settings</p>;
  const cDesign = data?.data?.custom_design;
  const { title, title_color } = cDesign?.feature_product[0] || {};

  return (
    <div className="py-5 sm:py-10 bg-[#F2F4F8]">
      <div className="container px-5">
        <div className="text-center pb-10">
          <p
            style={{
              color: title_color,
            }}
            className="font-bold text-[20px]"
          >
            {title}
          </p>
          <p className="text-[15px] mt-1">Check & Get Your Desired Product!</p>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-3 justify-center">
            {best_sell_product
              ?.slice(0, 12)
              .map((item: any, id: any) => (
                <Card65
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

export default BestSellerThirtyEight;
