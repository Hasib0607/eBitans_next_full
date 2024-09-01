import "./section-heading-seventeen.css";
const SectionHeadingSeventeen = ({ text, title_color }: any) => {
  return (
    <div className="py-1">
      <h3
        className="text-center text-[30px] xl:text-[40px] lg:text-[40px] md:text-[40px] text-style"
        style={{ color: title_color }}
      >
        {text}
      </h3>
    </div>
  );
};

export default SectionHeadingSeventeen;
