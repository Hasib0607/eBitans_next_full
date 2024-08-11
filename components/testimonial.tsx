import TestimonialFive from "@/components/_homepage/testimonial/testimonial-five";
import TestimonialThree from "./_homepage/testimonial/default";
import TestimonialOne from "./_homepage/testimonial/testimonial-one";
import TestimonialTwo from "./_homepage/testimonial/testimonial-two";
import TestimonialFour from "./_homepage/testimonial/testimonial-four";
import TestimonialSeven from "./_homepage/testimonial/testimonial-seven";
import TestimonialTwelve from "./_homepage/testimonial/testimonial-twelve";
import TestimonialTwentySeven from "./_homepage/testimonial/testimonial-twentyseven";
import TestimonialThirtyFive from "./_homepage/testimonial/testimonial-thirtyfive";

const Testimonial = ({ testimonials, theme, design }: any) => {
  return (
    <>
      {theme === "default" && <TestimonialThree testimonials={testimonials} />}
      {theme === "one" && <TestimonialOne testimonials={testimonials} />}
      {theme === "two" && (
        <TestimonialTwo testimonials={testimonials} design={design} />
      )}
      {theme === "three" && <TestimonialThree testimonials={testimonials} />}
      {theme === "four" && (
        <TestimonialFour testimonials={testimonials} design={design} />
      )}
      {theme === "five" && <TestimonialFive testimonials={testimonials} />}
      {theme === "six" && <TestimonialSeven testimonials={testimonials} />}
      {theme === "seven" && <TestimonialFive testimonials={testimonials} />}
      {theme === "eight" && <TestimonialFive testimonials={testimonials} />}
      {theme === "nine" && (
        <TestimonialTwelve testimonials={testimonials} design={design} />
      )}
      {theme === "ten" && <TestimonialSeven testimonials={testimonials} />}
      {theme === "twelve" && (
        <TestimonialTwo testimonials={testimonials} design={design} />
      )}
      {theme === "fifteen" && (
        <TestimonialTwelve testimonials={testimonials} design={design} />
      )}
      {theme === "twentyseven" && (
        <TestimonialTwentySeven testimonials={testimonials} design={design} />
      )}
      {theme === "thirtyone" && (
        <TestimonialTwentySeven testimonials={testimonials} design={design} />
      )}
      {theme === "thirtysix" && (
        <TestimonialTwentySeven testimonials={testimonials} design={design} />
      )}
      {theme === "thirtyfive" && (
        <TestimonialThirtyFive testimonials={testimonials} />
      )}
    </>
  );
};

export default Testimonial;
