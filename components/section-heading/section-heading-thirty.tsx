const SectionHeadingThirty = ({ title, subtitle, title_color }: any) => {
  return (
    <div className=" mb-3 font-twelve ">
      <h3 style={{ color: title_color }} className="text-[30px] font-semibold">
        {title}
      </h3>
      <p className="text-lg font-sans text-gray-500">{subtitle}</p>
    </div>
  );
};

export default SectionHeadingThirty;
