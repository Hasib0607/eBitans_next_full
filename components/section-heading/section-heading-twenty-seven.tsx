// import useTheme from '../../../@/hooks/useTheme';

const SectionHeadingTwentySeven = ({ title, subtitle, title_color }: any) => {
  return (
    <div className="my-5 pb-5 w-full">
      {/* <style>{classes}</style> */}
      <div className="text-left">
        <h3
          style={{ color: title_color }}
          className="text-2xl md:text-3xl text-black font-semibold mb-4"
        >
          {title}{" "}
          <span className="text-2xl md:text-3xl text-gray-500 font-semibold mb-4">
            {subtitle}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default SectionHeadingTwentySeven;
