import "./section-heading-seventeen.css";
const SectionHeadingSeventeen = ({ text, design }: any) => {
  return (
    <div className="py-1">
      <h3
        className="text-center text-[30px] xl:text-[40px] lg:text-[40px] md:text-[40px] text-style"
        style={{ color: `${design?.header_color}` }}
      >
        {text}
      </h3>
    </div>
  );
};

export default SectionHeadingSeventeen;
