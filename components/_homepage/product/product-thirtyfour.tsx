import Card60 from "@/components/card/card60";
import SectionHeadingThirtyFour from "@/components/section-heading/section-heading-thirtyfour";

const ProductThirtyFour = ({ product, design, store_id }: any) => {
  const styleCss = `
   
    .new-product-prev {
        color:  ${design.header_color};
        border: 1px solid ${design.header_color};
    }
      .new-product-next{
          color:  ${design.header_color};
          border: 1px solid ${design.header_color};
    }
      .new-product-prev:hover {
        color:  ${design.text_color};
        background: ${design.header_color};
    }
      .new-product-next:hover {
        color:  ${design.text_color};
        background: ${design.header_color};
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

  return (
    <div className="bg-[#F9F8FF]">
      <div className="sm:container px-5 sm:py-10 py-5">
        <style>{styleCss}</style>
        <div className="relative arrow-hov">
          <div className="text-center mb-5">
            <SectionHeadingThirtyFour title={"Just For You"} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1 sm:gap-5">
            {product?.slice(0, 10).map((productData: any) => (
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

export default ProductThirtyFour;
