import HeaderDown from "./header-down";
import HeaderMid from "./header-mid";
import HeaderTop from "./header-top";

const HeaderOne = ({ headerSetting }: any) => {
  return (
    <div className="flex flex-col gap-1">
      <HeaderTop headerSetting={headerSetting} />
      <HeaderDown />
      <HeaderMid />
    </div>
  );
};

export default HeaderOne;
