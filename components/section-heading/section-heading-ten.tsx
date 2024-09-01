interface Props {
  title?: string;
  title_color?: string;
  subtitle?: string;
}
const SectionHeadingTen = ({ title, title_color, subtitle }: Props) => {
  return (
    <div className=" bg-white  mb-3 text-center py-10">
      <h3 style={{ color: title_color }} className="text-2xl font-semibold">
        {title}
      </h3>
    </div>
  );
};

export default SectionHeadingTen;
