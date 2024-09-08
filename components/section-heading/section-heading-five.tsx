interface Props {
  title: string;
  subtitle?: string;
  title_color?: string;
}

const SectionHeadingFive = ({ title, title_color }: Props) => {
  return (
    <div className="space-y-2 mb-3">
      <h3 style={{ color: title_color }} className="text-2xl font-semibold">
        {title}
      </h3>
    </div>
  );
};

export default SectionHeadingFive;
