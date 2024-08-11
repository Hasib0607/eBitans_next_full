interface Props {
  title: string;
  subtitle?: string;
}

const SectionHeadingSix = ({ title, subtitle }: Props) => {
  return (
    <div className='container space-y-2 mb-3'>
      <h3 className='text-[22px] font-semibold'>{title}</h3>
      <p className='text-lg font-sans text-gray-500'>{subtitle}</p>
    </div>
  );
};

export default SectionHeadingSix;
