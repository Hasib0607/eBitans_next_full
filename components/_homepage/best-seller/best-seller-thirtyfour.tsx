import Card60 from "@/components/card/card60";
import SectionHeadingThirtyFour from "@/components/section-heading/section-heading-thirtyfour";
import useHeaderSettings from "@/utils/query/use-header-settings";

const BestSellerThirtyFour = ({ best_sell_product, design, store_id }: any) => {
  const styleCss = `
   
    .new-product-prev {
        color:  ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
      .new-product-next{
          color:  ${design?.header_color};
          border: 1px solid ${design?.header_color};
    }
      .new-product-prev:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
      .new-product-next:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    .arrow-hov:hover .arrow {
      opacity:1;
      background: white;
    }
    .see {
        color:  ${design?.text_color};
        background:  ${design?.header_color};
    }
 `;

  const { data, error } = useHeaderSettings();
  if (error) return <p>error from header-settings</p>;
  const cDesign = data?.data?.custom_design || {};
  const bestSellProduct = cDesign?.best_sell_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = bestSellProduct;

  // Check if there are any best selling products
  if (!best_sell_product || best_sell_product.length === 0) {
    return null;
  };

  return (
    <div className="bg-[#F9F8FF]">
      <div className="sm:container px-5 sm:py-10 py-5">
        <style>{styleCss}</style>
        <div className="relative arrow-hov">
          <div className="text-center mb-5">
            <SectionHeadingThirtyFour
              title={title || "Best Sell Product"}
              title_color={title_color || "#000"}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1 sm:gap-5">
            {best_sell_product?.slice(0, 10).map((productData: any) => (
              <div key={productData.id}>
                <Card60
                  item={productData}
                  design={design}
                  store_id={store_id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerThirtyFour;
