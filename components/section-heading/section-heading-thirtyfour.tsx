type Props = {
  title: string;
  title_color: string;
};
const SectionHeadingThirtyFour = ({ title, title_color }: Props) => {
  return (
    <div className="mb-3">
      <h3
        style={{ color: title_color }}
        className="text-[24px] font-bold text-gray-800"
      >
        {title}
      </h3>
    </div>
  );
};

export default SectionHeadingThirtyFour;
