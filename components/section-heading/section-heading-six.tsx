interface Props {
  title_color?: string;
  title: string;
  subtitle?: string;
}

const SectionHeadingSix = ({ title, title_color }: Props) => {
  return (
    <div className="container space-y-2 mb-3">
      <h3 style={{ color: title_color }} className="text-[22px] font-semibold">
        {title}
      </h3>
    </div>
  );
};

export default SectionHeadingSix;
