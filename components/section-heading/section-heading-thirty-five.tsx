const SectionHeadingThirtyFive = ({
  title,
  title_color,
}: {
  title: string;
  title_color?: string;
}) => {
  return (
    <div className="mb-10 text-center">
      <h3
        style={{ color: title_color }}
        className="text-2xl md:text-[32px] xl:text-[40px] font-bold"
      >
        {title}
      </h3>
    </div>
  );
};

export default SectionHeadingThirtyFive;
