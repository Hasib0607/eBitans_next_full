import Card21 from "@/components/card/card21";
import SectionHeadingSeventeen from "@/components/section-heading/section-heading-seventeen";

const BestSellerTen = ({ best_sell_product, item, design, store_id }: any) => {
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <SectionHeadingSeventeen
        title_color={"#000"}
        title={"Popular Products"}
        subtitle={""}
      />
      <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4 ">
        {best_sell_product
          ?.slice(0, 8)
          .map((item: any) => (
            <Card21
              item={item}
              key={item?.id}
              design={design}
              store_id={store_id}
            />
          ))}
      </div>
    </div>
  );
};

export default BestSellerTen;
