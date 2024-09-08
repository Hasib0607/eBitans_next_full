interface Props {
  title: string;
  title_color?: string;
  subtitle?: string;
}

const SectionHeadingNine = ({ title, subtitle, title_color }: Props) => {
  return (
    <div className=" bg-white text-center py-10  ">
      <h3 style={{ color: title_color }} className="text-[28px] font-semibold">
        {title}
      </h3>
      <p className="text-lg font-sans text-gray-500">{subtitle}</p>
    </div>
  );
};

export default SectionHeadingNine;
