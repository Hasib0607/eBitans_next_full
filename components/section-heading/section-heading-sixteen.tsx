interface Props {
  title_color?: string;
  title: string;
  subtitle?: string;
}

const SectionHeadingSixteen = ({ title, title_color }: Props) => {
  return (
    <div className="text-center mb-8">
      <h3
        style={{ color: title_color }}
        className="sm:text-[35px] text-2xl font-semibold"
      >
        {title}
      </h3>
    </div>
  );
};

export default SectionHeadingSixteen;
