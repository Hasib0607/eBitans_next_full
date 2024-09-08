const SectionHeadingNineteen = ({ title, subtitle, title_color }: any) => {
  return (
    <div className=" mb-3">
      <p
        style={{ color: title_color }}
        className="text-sm font-sans text-gray-500"
      >
        {title}
      </p>
      <h3 className="text-2xl font-semibold ">{subtitle}</h3>
    </div>
  );
};

export default SectionHeadingNineteen;
