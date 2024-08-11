import img from "@/assets/bg-image/thirtySeven/MARGIN.png";
import Card64 from "@/components/card/card64";

const BestSellerThirtySeven = ({
  best_sell_product,
  design,
  store_id,
}: any) => {
  if (best_sell_product.length === 0) {
    return null;
  }
  return (
    <div className="shadow-lg py-5 sm:py-10 rounded-sm bg-[#F1F9DD]">
      <div className="container px-5">
        <div>
          <img src={img.src} alt="margin" className="mx-auto" />
          <h1 className="text-2xl text-center">BEST SALE PRODUCTS</h1>
        </div>
        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-3 lg:grid-cols-5 xl:grid-cols-6 justify-center">
            {best_sell_product?.slice(0, 12).map((item: any, id: any) => (
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

export default BestSellerThirtySeven;
