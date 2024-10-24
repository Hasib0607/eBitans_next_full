"use client";
import Slider from "@/components/slider/slider";
import { testimonialImg } from "@/site-settings/siteUrl";
import { SwiperSlide } from "swiper/react";

const TestimonialFive = ({ testimonials }: any) => {
  return (
    <div
      className=""
      style={{
        backgroundImage: `url("http://demo.posthemes.com/pos_optima_cosmetic/cosmetic4/themes/theme_optima_cosmetic4/assets/img/bg_testi.jpg")`,
      }}
    >
      <div className="container px-5">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <h1 className="text-3xl font-medium title-font text-gray-900 mb-2 text-left">
              Client Testimonials
            </h1>
            <p className="mb-10">What our happy customers says !</p>
            <div className="flex flex-wrap -m-6">
              <Slider>
                {testimonials.map((single: any) => {
                  return (
                    <SwiperSlide key={single.id}>
                      <div className="p-4 w-full">
                        <div className="h-full rounded lg:flex items-center gap-6">
                          <img
                            alt="testimonial"
                            src={testimonialImg + single.image}
                            className="lg:w-28 lg:h-28 md:w-32 md:h-32 lg:ml-0 ml-20 h-40 w-40 -mr-12 rounded-full z-10 flex-shrink-0 object-cover object-center border-4 border-white"
                          />
                          <div className="bg-white rounded-md h-full py-8 px-10 w-full mb-5">
                            <p className="leading-relaxed mb-6">
                              {single.feedback}
                            </p>

                            <div className="inline-flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="block w-5 h-full text-gray-400 mb-2 rotate-180"
                                viewBox="0 0 975.036 975.036"
                              >
                                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                              </svg>
                              <span className="flex-grow flex flex-col pl-4">
                                <span className="title-font font-medium text-gray-900">
                                  {single.name}
                                </span>
                                <span className="text-gray-300 text-sm font-semibold">
                                  {single.occupation}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Slider>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestimonialFive;
