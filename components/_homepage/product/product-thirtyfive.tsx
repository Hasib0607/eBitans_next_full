"use client";
import Card61 from "@/components/card/card61";
import SectionHeadingThirtyFive from "@/components/section-heading/section-heading-thirty-five";
import DefaultSlider from "@/components/slider/default-slider";
import { SwiperSlide } from "swiper/react";

const ProductThirtyFive = ({ product, design, store_id }: any) => {
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

  const prevEl = "product-prev";
  const nextEl = "product-next";

  return (
    <div className="">
      <div className="sm:container px-5 sm:py-10 py-5">
        <style>{styleCss}</style>
        <div className="relative arrow-hov">
          <div className="text-center mb-5">
            <SectionHeadingThirtyFive title={"✦ PRODUCTS ✦"} />
          </div>

          <DefaultSlider
            prevEl={prevEl}
            nextEl={nextEl}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              980: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
              1440: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
          >
            {product?.slice(0, 10).map((item: any) => (
              <SwiperSlide key={item?.id}>
                <div className="px-2">
                  <Card61 item={item} design={design} store_id={store_id} />
                </div>
              </SwiperSlide>
            ))}
          </DefaultSlider>
        </div>
      </div>
    </div>
  );
};

export default ProductThirtyFive;
