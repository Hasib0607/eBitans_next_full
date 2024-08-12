"use client";
import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { testimonialImg } from "@/site-settings/siteUrl";

const TestimonialOne = ({ testimonials }: any) => {
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <div className="relative">
        <div className="flex items-center justify-between h-full w-full absolute z-0">
          <div className="w-1/3 bg-white h-full" />
          <div className="w-4/6 ml-16 bg-gray-100 h-full" />
        </div>

        <div className="relative z-[1]">
          <CarouselProvider
            naturalSlideHeight={600}
            naturalSlideWidth={100}
            isIntrinsicHeight={true}
            totalSlides={testimonials.length}
          >
            <h1 className="text-5xl font-bold xl:block hidden leading-tight text-gray-800">
              What our customers are
              <br />
              saying
            </h1>
            <h1 className="text-5xl font-bold xl:hidden block leading-tight lg:leading-10 text-gray-800">
              What our customers are saying
            </h1>
            <Slider>
              {testimonials?.map((review: any, idx: any) => (
                <Slide key={idx} index={idx}>
                  <div className="flex">
                    <div className="mt-14 md:flex w-full">
                      <div className="relative lg:w-1/2 sm:w-96 xl:h-96 h-80">
                        <img
                          src={testimonialImg + review?.image}
                          alt=""
                          className="min-w-full h-full object-fit object-cover shadow-lg rounded"
                        />
                        <div className="w-32 md:flex hidden items-center justify-center absolute top-0 -mr-16 -mt-14 right-0 h-32 bg-indigo-100 rounded-full">
                          <img
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonial-svg1.svg"
                            alt="commas"
                          />
                        </div>
                      </div>
                      <div className="md:w-1/3 lg:w-1/3 xl:ml-32 md:ml-20 md:mt-0 mt-4 flex flex-col justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            {review.feedback}
                          </p>
                        </div>
                        <div className="md:mt-0 mt-8">
                          <p className="text-base font-medium leading-4 text-gray-800">
                            {review.name}
                          </p>
                          <p className="text-base leading-4 mt-2 mb-4 text-gray-600">
                            {review.occupation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slide>
              ))}
            </Slider>
            <div className="flex items-center mt-8">
              <ButtonBack
                className="lg:cursor-pointer "
                role="button"
                aria-label="previous slide"
              >
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonal-svg2.svg"
                  alt="previous"
                />
              </ButtonBack>

              <ButtonNext
                role="button"
                aria-label="next slide"
                className="lg:cursor-pointer ml-2"
              >
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonial-svg3.svg"
                  alt="next"
                />
              </ButtonNext>
            </div>
          </CarouselProvider>
        </div>
      </div>
    </div>
  );
};

export default TestimonialOne;
