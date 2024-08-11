import ProductCardTwo from "@/components/card/product-card/product-card-two";
import SectionHeading from "@/components/section-heading/section-heading";

const ProductFour = ({ product, design, store_id }: any) => {
  if (product.length === 0) {
    return;
  }
  return (
    <div className="bg-gray-50 sm:py-10 py-5">
      <div className="sm:container px-5 mx-auto">
        <div className="py-6">
          <SectionHeading text={"Products"} design={design} />
        </div>
        <div className="shadow-lg drop-shadow-lg bg-white ">
          <div className="">
            <div className="flex justify-center py-5 sm:py-10  ">
              <div className="flex flex-wrap gap-8 justify-center">
                {product?.slice(0, 10).map((item: any) => (
                  <ProductCardTwo
                    item={item}
                    key={item.id}
                    design={design}
                    store_id={store_id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFour;
