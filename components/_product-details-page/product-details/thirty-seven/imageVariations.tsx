import { TiTickOutline } from "react-icons/ti";

export const Units = ({ unit, setUnit, variant, setActiveImg }: any) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <h3 className="font-medium font-sans text-xl mb-2">Units</h3>
      <div className="flex flex-wrap items-center gap-2">
        {variant?.map((item: any, id: any) => (
          <Unit
            key={id}
            item={item}
            select={unit}
            setSelect={setUnit}
            setActiveImg={setActiveImg}
          />
        ))}
      </div>
    </div>
  );
};

export const ColorsOnly = ({ color, setColor, variant, setActiveImg }: any) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <h3 className="font-medium text-base">Colors:</h3>
      <div className="flex flex-wrap items-center gap-2">
        {variant?.map((item: any, id: any) => (
          <ColorSet
            key={id}
            text={item}
            select={color}
            setSelect={setColor}
            itemImage={item?.image}
            setActiveImg={setActiveImg}
          />
        ))}
      </div>
    </div>
  );
};

export const Sizes = ({ size, setSize, variant, setActiveImg }: any) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <h3 className="font-medium text-base">Sizes:</h3>
      <div className="flex flex-wrap items-center gap-2">
        {variant?.map((item: any, id: any) => (
          <Size
            key={id}
            item={item}
            select={size}
            setSelect={setSize}
            setActiveImg={setActiveImg}
          />
        ))}
      </div>
    </div>
  );
};

export const Colors = ({ color, setColor, vrcolor, setSize }: any) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <h3 className="font-medium text-base">Colors:</h3>
      <div className="flex flex-wrap items-center gap-2">
        {vrcolor?.map((item: any, id: any) => (
          <Color
            key={id}
            text={item}
            select={color}
            setSelect={setColor}
            setSize={setSize}
          />
        ))}
      </div>
    </div>
  );
};

export const Unit = ({ item, select, setSelect, setActiveImg }: any) => {
  return (
    <div
      onClick={() => {
        setSelect(item);
        setActiveImg(item?.image);
      }}
      className={`border lg:cursor-pointer w-auto px-1 h-10 flex justify-center items-center font-sans text-sm rounded ${
        item === select ? "select-unit" : "border-gray-300"
      }`}
    >
      {item?.volume + " " + item?.unit}
    </div>
  );
};

export const Size = ({ item, select, setSelect, setActiveImg }: any) => {
  return (
    <div
      onClick={() => {
        setSelect(item);
        setActiveImg(item?.image);
      }}
      className={`border border-gray-500 lg:cursor-pointer w-auto px-3 h-10 flex justify-center items-center font-sans font-medium rounded ${
        item === select ? "select-size" : "border-gray-300"
      }`}
    >
      {item?.size}
    </div>
  );
};

export const Color = ({ text, select, setSelect, setSize }: any) => {
  return (
    <div
      onClick={() => {
        setSelect(text);
        setSize(null);
      }}
      className={`border lg:cursor-pointer w-7 h-7 flex justify-center items-center font-sans font-medium rounded-full bg-white ${
        text === select ? "select-color" : "border-gray-300"
      }`}
    >
      <div
        style={{ backgroundColor: text }}
        className="w-5 h-5 rounded-full relative overflow-hidden"
      >
        {text === select && (
          <div className="text-white bg-green-500 text-sm h-10 w-14 rotate-[45deg] translate-y-1 translate-x-1"></div>
        )}
        {text === select && (
          <TiTickOutline className="absolute right-0 bottom-0 text-sm text-white" />
        )}
      </div>
    </div>
  );
};

export const ColorSet = ({
  text,
  select,
  setSelect,
  itemImage,
  setActiveImg,
}: any) => {
  return (
    <div
      onClick={() => {
        setSelect(text);
        setActiveImg(itemImage);
      }}
      className={`border lg:cursor-pointer w-7 h-7 flex justify-center items-center font-sans font-medium rounded-full bg-white ${
        text === select ? "select-color" : "border-gray-300"
      }`}
    >
      <div
        style={{ backgroundColor: text?.color }}
        className="w-5 h-5 rounded-full relative overflow-hidden"
      >
        {text === select && (
          <div className="text-white bg-green-500 text-sm h-10 w-14 rotate-[45deg] translate-y-1 translate-x-1"></div>
        )}
        {text === select && (
          <TiTickOutline className="absolute right-0 bottom-0 text-sm text-white" />
        )}
      </div>
    </div>
  );
};
