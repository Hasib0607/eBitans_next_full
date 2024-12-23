import useTheme from "@/hooks/use-theme";

const CallForPriceForCard = ({ product, headerSetting, price }: any) => {
  const { design } = useTheme();

  const styleCss = `
  .text-color {
      color:  ${design?.header_color};
  }
`;

  return (
    <>
      <style>{styleCss}</style>
      {price === 0 && (
        <div>
          <a href={"tel:+88" + headerSetting?.phone}>
            <p className={`text-color`}>Call for Price</p>
          </a>
        </div>
      )}
    </>
  );
};

export default CallForPriceForCard;
