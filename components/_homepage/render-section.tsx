"use client"
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import BlogSection from "./blog/blog-section";
import axios from "axios";
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

const RenderSection = ({ component, data }: RenderSectionProps) => {
  const { slider,category, banner, testimonials, design, store_id, brand } = data;

  const [renderData, setRenderData] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);

    useEffect(() => {
      const getRenderData = (domain: any) => {
          const head =
              "product,best_sell_product,feature_product";
        
            axios.post(
              process.env.NEXT_PUBLIC_API_URL + "getsubdomain/name",
              {
                name: domain,
                head: head,
              }
            ).then((response) => {
              setLoading(false);
              const responseData = response?.data || {};

              setRenderData(responseData);
            }).then((err) => {
              // console.log("err")
            })
      };

      if (typeof window !== "undefined") {
        const domain = window.location.host.startsWith("www.")
          ? window.location.host.slice(4)
          : window.location.host;
  
        getRenderData(domain);
      }
    }, []);

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

  };

  switch (component) {
    case "hero_slider":
      return (
        <Hero slider={slider} theme={design?.hero_slider} design={design} />
      );
    // add new design
    case "feature_category":
      if(!loading){
        return (
          <FeaturedCategory
            theme={design?.feature_category}
            category={category}
            design={design}
            product={renderData?.product || []}
            store_id={store_id}
          />
        );
      }
      
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
      if(!loading){
        return (
          <Product
            theme={design?.product}
            design={design}
            store_id={store_id}
             product={renderData?.product || []}
             best_sell_product={renderData?.best_sell_product || []}
             feature_product={renderData?.feature_product || []}
            category={category}
          />
        );
      }

    // add new design
    case "new_arrival":
      if(!loading){
        return (
          <NewArrival
            product={renderData?.product || []}
            theme={design?.new_arrival}
            design={design}
            store_id={store_id}
            category={category}
          />
        );
      }
    // add new design
    case "best_sell_product":
      if(!loading){
        return (
          <BestSellerProduct
            theme={design?.best_sell_product}
            best_sell_product={renderData?.best_sell_product || []}
            design={design}
            store_id={store_id}
            product={renderData?.product || []}
            banner={banner}
          />
        );
      }
    //  add new design
    case "feature_product":
      if(!loading){
        return (
          <FeatureProduct
            theme={design?.feature_product}
            feature_product={renderData?.feature_product || []}
            design={design}
            store_id={store_id}
            product={renderData?.product || []}
            banner={banner}
          />
        );
      }
    case "testimonial":
      renderTestimonialAndBlog();
    default:
      return null;
  }
};

RenderSection.displayName = "RenderSection";
export default RenderSection;
