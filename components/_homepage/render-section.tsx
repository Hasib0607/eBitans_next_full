import dynamic from "next/dynamic";
import { Suspense } from "react";
import BlogSection from "./blog/blog-section";
const Hero = dynamic(() => import("../hero"), { ssr: false });
const FeaturedCategory = dynamic(() => import("../featured-category"), {
  ssr: false,
});
const Promo = dynamic(() => import("../promo"), { ssr: false });
const PromoBottom = dynamic(() => import("../promo-bottom"), { ssr: false });
const Product = dynamic(() => import("../product"), { ssr: false });
const NewArrival = dynamic(() => import("../new-arrival"), { ssr: false });
const BestSellerProduct = dynamic(() => import("../best-seller-product"), {
  ssr: false,
});
const FeatureProduct = dynamic(() => import("../feature-product"), {
  ssr: false,
});
const Testimonial = dynamic(() => import("../testimonial"), { ssr: false });

type ComponentType =
  | "hero_slider"
  | "feature_category"
  | "banner"
  | "banner_bottom"
  | "product"
  | "new_arrival"
  | "best_seller_product"
  | "feature_product"
  | "testimonial";

interface RenderSectionProps {
  component: ComponentType;
  data: {
    headersetting?: any;
    slider?: any;
    category?: any;
    banner?: any;
    product?: any;
    best_sell_product?: any;
    feature_product?: any;
    testimonials?: any;
    design?: any;
    store_id?: any;
    brand?: any;
  };
}

const RenderSection = ({ component, data }: RenderSectionProps) => {
  const {
    headersetting,
    slider,
    category,
    banner,
    product,
    best_sell_product,
    feature_product,
    testimonials,
    design,
    store_id,
    brand,
  } = data;

  const renderTestimonialAndBlog = () => {
    if (component === "testimonial") {
      return (
        <>
          <Suspense fallback={<p>Loading...</p>}>
            <BlogSection />
          </Suspense>

          <Testimonial
            testimonials={testimonials}
            theme={design?.testimonial}
            design={design}
          />
        </>
      );
    }
    return (
      <Suspense>
        <BlogSection />
      </Suspense>
    );
  };

  switch (component) {
    case "hero_slider":
      return (
        <Hero slider={slider} theme={design?.hero_slider} design={design} />
      );
    // add new design
    case "feature_category":
      return (
        <FeaturedCategory
          theme={design?.feature_category}
          category={category}
          design={design}
          product={product}
          store_id={store_id}
        />
      );
    case "banner":
      return (
        <Promo
          design={design}
          store_id={store_id}
          theme={design?.banner}
          banner={banner}
        />
      );
    case "banner_bottom":
      return (
        <PromoBottom
          theme={design?.banner_bottom}
          banner={banner}
          brand={brand}
        />
      );
    // add new design
    case "product":
      return (
        <Product
          theme={design?.product}
          design={design}
          store_id={store_id}
          product={product}
          best_sell_product={best_sell_product}
          feature_product={feature_product}
          category={category}
          headerSetting={headersetting}
        />
      );
    // add new design
    case "new_arrival":
      return (
        <NewArrival
          product={product}
          theme={design?.new_arrival}
          design={design}
          store_id={store_id}
          category={category}
        />
      );
    // add new design
    case "best_seller_product":
      return (
        <BestSellerProduct
          theme={design?.best_sell_product}
          best_sell_product={best_sell_product}
          design={design}
          store_id={store_id}
          product={product}
          banner={banner}
        />
      );
    //  add new design
    case "feature_product":
      return (
        <FeatureProduct
          theme={design?.feature_product}
          feature_product={feature_product}
          design={design}
          store_id={store_id}
          product={product}
          banner={banner}
        />
      );
    case "testimonial":
      return renderTestimonialAndBlog();
    default:
      return null;
  }
};

RenderSection.displayName = "RenderSection";
export default RenderSection;
