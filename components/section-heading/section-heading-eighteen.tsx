interface Props {
  titleColor?: string;
  title?: string;
  subtitle?: string;
}
const SectionHeadingEighteen = ({ title, titleColor }: Props) => {
  return (
    <div className="container text-center mb-10">
      <h3 className="text-2xl font-semibold" style={{ color: titleColor }}>
        {title}
      </h3>
    </div>
  );
};

export default SectionHeadingEighteen;
