interface Props {
  title: string;
  title_color?: string;
}
const SectionHeadingThirtyThree = ({ title, title_color }: Props) => {
  return (
    <div className="mb-3 ">
      <h3
        style={{ color: title_color }}
        className="text-[20px] font-medium text-gray-700"
      >
        {title}
      </h3>
    </div>
  );
};

export default SectionHeadingThirtyThree;
