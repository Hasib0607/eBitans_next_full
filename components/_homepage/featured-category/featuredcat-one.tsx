"úse client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { SwiperSlide } from "swiper/react";
import Slider1 from "@/components/slider/slider-one";
import Link from "next/link";
import { iconImg } from "@/site-settings/siteUrl";
import { motion } from "framer-motion";

const FeaturedOne = ({ category, design }: any) => {
  const prev = "cat_Prev";
  const next = "cat_Next";
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <div className="">
        <div className="my-5 w-full pt-1 flex justify-between items-center flex-wrap">
          <Title text={"Popular"}>Categories</Title>
          <Arrow design={design} prevEl={prev} nextEl={next}></Arrow>
        </div>
        <Slider1
          prevEl={prev}
          nextEl={next}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
        >
          {category?.map((cat: any) => (
            <SwiperSlide key={cat?.id}>
              <SingleCard cat={cat} />
            </SwiperSlide>
          ))}
        </Slider1>
      </div>
    </div>
  );
};

export default FeaturedOne;

const SingleCard = ({ cat }: any) => {
  return (
    <Link href={"/category/" + cat?.id} className="drop-shadow-xl">
      <figure className="overflow-hidden flex justify-center w-32 h-32 mx-auto">
        <motion.img
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.5 },
          }}
          exit={{
            scale: 1,
            transition: { duration: 0.5 },
          }}
          src={iconImg + cat?.icon}
          alt=""
          className="h-auto"
        />
      </figure>
      <h3 className="text-center font-normal text-sm text-gray-400 tracking-wider hover:text-orange-400 my-3">
        {cat?.name}
      </h3>
    </Link>
  );
};

const Title = ({ text, children, color }: any) => {
  return (
    <h3
      style={{ fontSize: "22px" }}
      className="font-semibold flex gap-1 text-black"
    >
      <span>{text}</span>
      {children}
    </h3>
  );
};

const Arrow = ({ nextEl, prevEl, design }: any) => {
  const classes = `
    .arrow {
        color:${design?.text_color};
        background:${design?.header_color}
    }
    .arrow:hover {
        color:${design?.header_color};
        background-color:${design?.text_color}
    }
    `;
  return (
    <div className="flex gap-2">
      <style>{classes}</style>
      <div
        className={`${prevEl} p-3 icon rounded-full arrow transition-all duration-500  ease-linear`}
      >
        <ArrowLeftIcon className="h-4 w-4 text-2xl font-serif font-bold" />
      </div>
      <div
        className={`${nextEl} p-3 icon rounded-full arrow transition-all duration-500  ease-linear`}
      >
        <ArrowRightIcon className="h-4 w-4 text-2xl font-serif font-bold" />
      </div>
    </div>
  );
};
