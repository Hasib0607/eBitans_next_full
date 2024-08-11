interface Props {
  title: string;
  subtitle?: string;
}
const SectionHeadingTwelve = ({ title, subtitle }: Props) => {
  return (
    <div className=' bg-white  mb-3 font-twelve '>
      <h3 className='text-[22px] py-4 font-semibold'>{title}</h3>
      <p className='text-lg font-sans text-gray-500'>{subtitle}</p>
    </div>
  );
};

export default SectionHeadingTwelve;
