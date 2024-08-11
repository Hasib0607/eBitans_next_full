"use client";
import image from "@/components/_homepage/featured-category/seventeen-bg-img/show_divider_1_104x62.webp";
import img2 from "@/components/_homepage/featured-category/seventeen-bg-img/border.webp";
import img1 from "@/components/_homepage/featured-category/seventeen-bg-img/icon_wrapper_bg_1.webp";
import "./featuredcat-seventeen.css";
import Link from "next/link";
import { catImg, iconImg } from "@/site-settings/siteUrl";
import SectionHeadingSeventeen from "@/components/section-heading/section-heading-seventeen";
import Image from "next/image";
import {
  ParallaxBanner,
  ParallaxBannerLayer,
  ParallaxProvider,
} from "react-scroll-parallax";

const FeaturedSeventeen = ({ category }: any) => {
  const cat = category.filter((item: any) => item?.cat !== null);

  return (
    <div className="">
      <div className="relative z-0 md:max-h-[500px] overflow-hidden">
        {/* yet to implement */}
        <ParallaxProvider>
          <ParallaxBanner className="aspect-[2/1] bg-[#ff7380] w-full">
            <ParallaxBannerLayer
              image={img1.src}
              speed={-50}
              style={{
                backgroundSize: "auto",
                backgroundPosition: "center",
                backgroundRepeat: "repeat-x",
              }}
            />
          </ParallaxBanner>
        </ParallaxProvider>

        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[1] grid grid-cols-3 justify-between items-center sm:container px-5 xl:px-80 mx-auto">
          {category?.slice(0, 3).map((cat: any) => (
            <Link key={cat?.id} href={`/category/${cat.id}`}>
              <div className="hover:-translate-y-6 duration-500 h-full w-full justify-self-center">
                <div className={`relative max-h-[200px] w-max mx-auto`}>
                  <Image src={img2.src} alt="" className="h-20 md:h-auto" />
                  <img
                    src={iconImg + cat?.icon}
                    alt=""
                    className="md:max-h-[50px] h-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                  />
                </div>
                <p className="text-center md:mt-5 mt-2 text-xl xl:text-3xl text-white text-style">
                  {cat?.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="catSeventeenBottomBackGroundImage absolute -bottom-1 z-10"></div>
      </div>

      <div className="styleSeventeenbackgroundImage">
        <div className="flex justify-center pt-10">
          <SectionHeadingSeventeen text={"Most popular creations"} />
        </div>
        <div className="flex justify-center pt-2">
          <Image src={image.src} alt="" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg2:grid-cols-4 gap-y-10 md:gap-x-10 mt-14 z-10 sm:container px-5 xl:px-80 mx-auto pb-10 xl:pb-32">
          <Link href={`/category/${cat[0]?.cat[0]?.id}`}>
            <div>
              <img
                src={catImg + cat[0]?.cat[0]?.banner}
                alt=""
                className="h-auto min-w-full hover:scale-105 duration-500"
              />
              <p className="text-center mt-6 text-style text-xl lg:text-3xl">
                {cat[0]?.cat[0]?.name}
              </p>
            </div>
          </Link>
          <Link href={`/category/${cat[1]?.cat[0]?.id}`}>
            <div>
              <img
                src={catImg + cat[1]?.cat[0]?.banner}
                alt=""
                className="h-auto min-w-full hover:scale-105 duration-500"
              />
              <p className="text-center mt-6 text-style text-xl lg:text-3xl">
                {cat[1]?.cat[0]?.name}
              </p>
            </div>
          </Link>
          <Link href={`/category/${cat[2]?.cat[0]?.id}`}>
            <div>
              <img
                src={catImg + cat[2]?.cat[0]?.banner}
                alt=""
                className="h-auto min-w-full hover:scale-105 duration-500"
              />
              <p className="text-center mt-6 text-style text-xl lg:text-3xl">
                {cat[2]?.cat[0]?.name}
              </p>
            </div>
          </Link>
          <Link href={`/category/${cat[3]?.cat[0]?.id}`}>
            <div>
              <img
                src={catImg + cat[3]?.cat[0]?.banner}
                alt=""
                className="h-auto min-w-full hover:scale-105 duration-500"
              />
              <p className="text-center mt-6 text-style text-xl lg:text-3xl">
                {cat[3]?.cat[0]?.name}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSeventeen;
