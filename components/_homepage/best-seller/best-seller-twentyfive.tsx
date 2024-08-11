import Card50 from "@/components/card/card50";
import SectionHeadingTwentyFive from "@/components/section-heading/section-heading-twenty-five";

const BestSellerTwentyFive = ({ best_sell_product, store_id, design }: any) => {
  return (
    <div className="sm:px-10 px-5">
      <SectionHeadingTwentyFive title={"Trading"} />

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 md:grid-cols-3 gap-4">
        {best_sell_product?.slice(0, 10)?.map((item: any) => (
          <Card50
            item={item}
            key={item?.id}
            store_id={store_id}
            design={design}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellerTwentyFive;
