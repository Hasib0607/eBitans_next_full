import dynamic from "next/dynamic";
import { Suspense } from "react";
import BlogSection from "./blog/blog-section";
import FeaturedCategoryMain from "./featured-category/featurecat-main";
import FeaturedProductMain from "./feature-product/feature-product-main";
import ProductMain from "./product/product-main";
import BestSellMain from "./best-seller/best-sell-main";
import NewArrivalProductMain from "../new-arrival/new-arrival-product-main";
const Hero = dynamic(() => import("../hero"));
const Promo = dynamic(() => import("../promo"));
const PromoBottom = dynamic(() => import("../promo-bottom"));
const Testimonial = dynamic(() => import("../testimonial"));

type ComponentType =
  | "hero_slider"
  | "feature_category"
  | "banner"
  | "banner_bottom"
  | "product"
  | "new_arrival"
  | "best_sell_product"
  | "feature_product"
  | "testimonial";

interface RenderSectionProps {
  component: ComponentType;
  data: {
    slider?: any;
    category?: any;
    banner?: any;
    testimonials?: any;
    design?: any;
    store_id?: any;
    brand?: any;
  };
}

const RenderSection = async ({ component, data }: RenderSectionProps) => {
const { slider, category, banner, testimonials, design, store_id, brand } = data;

switch (component) {
  case "hero_slider":
    return (
      <Hero slider={slider} theme={design?.hero_slider} design={design} />
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

  case "feature_category":
    return (
    <FeaturedCategoryMain
      category={category}
      design={design}
      store_id={store_id}
    />
  );

  case "feature_product":
    return (
    <FeaturedProductMain
      banner={banner}
      design={design}
      store_id={store_id}
    />
  );

  case "product":
    return (<ProductMain
      category={category}
      design={design}
      store_id={store_id}
    />)

  case "best_sell_product":
    return (<BestSellMain
      banner={banner}
      design={design}
      store_id={store_id}
    />)

  case "new_arrival":
    return (<NewArrivalProductMain
      category={category}
      design={design}
      store_id={store_id}
    />)

  case "testimonial":
    return (
      <>
        <Suspense fallback={<p></p>}>
          <BlogSection />
        </Suspense>

        <Testimonial
          testimonials={testimonials}
          theme={design?.testimonial}
          design={design}
        />
      </>
    );
  default:
    return null;
  }
};

RenderSection.displayName = "RenderSection";
export default RenderSection;
