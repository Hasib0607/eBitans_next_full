// import useTheme from './../../../@/hooks/useTheme';

const SectionHeadingTwentyTwo = ({
  text,
  title_color,
}: {
  text: string;
  title_color?: string;
}) => {
  return (
    <div className="py-1">
      <h3
        className="text-center font-semibold text-[30px] xl:text-[40px] lg:text-[40px] md:text-[40px] "
        style={{ color: title_color }}
      >
        {text}
      </h3>
    </div>
  );
};

export default SectionHeadingTwentyTwo;
