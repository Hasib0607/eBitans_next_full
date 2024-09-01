interface Props {
  title?: string;
  title_color?: string;
  design?: any;
}

const SectionHeadingTwentyFive = ({ title, title_color, design }: Props) => {
  return (
    <div>
      <div className="container text-center py-10 mb-3">
        <h3 style={{ color: title_color }} className="text-2xl font-semibold">
          {title}
        </h3>
        <div
          style={{ background: design?.header_color }}
          className="mx-auto my-3 w-60 h-[3px] rounded-full bg-[#4c9a2a]"
        ></div>
      </div>
    </div>
  );
};

export default SectionHeadingTwentyFive;
