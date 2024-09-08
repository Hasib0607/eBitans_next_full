const SectionHeading = ({ text, design, title_color }: any) => {
  return (
    <div className="py-1">
      <h3
        style={{ color: title_color }}
        className="text-center font-semibold text-2xl"
      >
        {text}
      </h3>
      <div
        className="mx-auto my-1 w-52 border-2 rounded-full"
        style={{ borderColor: design?.header_color }}
      ></div>
    </div>
  );
};

export default SectionHeading;
