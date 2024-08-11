interface Props {
  title: string;
  subtitle?: string;
}

const SectionHeadingSixteen = ({ title, subtitle }: Props) => {
  return (
    <div className="text-center mb-8">
      <h3 className="sm:text-[35px] text-2xl font-semibold">{title}</h3>
      <p className="text-lg font-sans text-gray-500">{subtitle}</p>
    </div>
  );
};

export default SectionHeadingSixteen;
