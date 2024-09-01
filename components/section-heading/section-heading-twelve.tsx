interface Props {
  title: string;
  title_color?: string;
}
const SectionHeadingTwelve = ({ title, title_color }: Props) => {
  return (
    <div className=" bg-white  mb-3 font-twelve ">
      <h3
        style={{ color: title_color }}
        className="text-[22px] py-4 font-semibold"
      >
        {title}
      </h3>
    </div>
  );
};

export default SectionHeadingTwelve;
