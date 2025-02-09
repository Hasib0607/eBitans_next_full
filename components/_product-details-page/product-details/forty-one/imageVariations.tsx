import { productImg } from "@/site-settings/siteUrl";

export const Units = ({ unit, setUnit, variant, setActiveImg }: any) => {
  return (
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2">Units</h3>
      <div className="flex flex-wrap gap-2">
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

export const ColorsOnly = ({
  color,
  setColor,
  variant,
  setActiveImg,
  vrcolorimage,
  activeImg,
  productImage,
}: any) => {
  const hasNullImage = vrcolorimage?.some((item: any) => item?.image === null);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium mb-2 text-base">Colors:</h3>
      <div className="flex flex-wrap gap-2">
        {hasNullImage &&
          variant?.map((item: any, id: any) => (
            <ColorSet
              key={id}
              text={item}
              select={color}
              setSelect={setColor}
              itemImage={item?.image}
              setActiveImg={setActiveImg}
            />
          ))}
        {!hasNullImage &&
          vrcolorimage?.map((item: any, id: any) => (
            <div
              onClick={() => {
                setColor(item?.color);
                setActiveImg(item?.image);
              }}
              key={id}
              className="focus:outline-none w-[50px] cursor-pointer"
            >
              <img
                className={`h-[50px] w-[50px] rounded-full object-cover object-center bg-gray-100 border ${activeImg == item?.image ? "border-red-800" : "border-gray-400"}`}
                src={
                  item?.image != null
                    ? productImg + item?.image
                    : productImg + productImage
                }
                alt=""
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export const Sizes = ({
  size,
  setSize,
  variant,
  activeImg,
  setActiveImg,
}: any) => {
  // Check if the variant array has any items with a valid 'image'
  const hasImages = variant?.some((item: any) => item?.image);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-base mb-2">Pattern:</h3>
      <div className="flex flex-wrap gap-2">
        {hasImages
          ? // Render variants with valid 'image'
            variant
              ?.filter((item: any) => item?.image)
              .map((item: any, id: any) => (
                <div
                  key={id}
                  onClick={() => {
                    setSize(item);
                    setActiveImg(item?.image);
                  }}
                  className="focus:outline-none w-[50px] cursor-pointer"
                >
                  <img
                    className={`h-[50px] w-[50px] rounded-full object-cover object-center bg-gray-100 border ${
                      activeImg == item?.image
                        ? "border-red-800"
                        : "border-gray-400"
                    }`}
                    src={productImg + item?.image}
                    alt=""
                  />
                </div>
              ))
          : // Render all variants when no valid 'image' is found
            variant?.map((item: any, id: any) => (
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

export const Colors = ({
  color,
  setColor,
  vrcolor,
  setSize,
  setActiveImg,
  activeImg,
  vrcolorimage,
}: any) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium mb-2 text-base">Colors:</h3>
      <div className="flex flex-wrap gap-2">
        {vrcolorimage
          ?.filter((item: any) => item?.color_image) // Exclude items where 'color_image' is null
          ?.map((item: any, id: any) => (
            <div
              onClick={() => {
                setColor(item?.color);
                setSize(null);
                setActiveImg(item?.color_image);
              }}
              key={id}
              className="focus:outline-none w-[50px] cursor-pointer"
            >
              <img
                className={`h-[50px] w-[50px] rounded-full object-cover object-center bg-gray-100 border ${color == item?.color ? "border-red-800" : "border-gray-400"}`}
                src={productImg + item?.color_image}
                alt=""
              />
            </div>
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

export const Color = ({
  text,
  select,
  setSelect,
  setSize,
  setActiveImg,
}: any) => {
  return (
    <div
      onClick={() => {
        setSelect(text);
        setSize(null);
        setActiveImg(text?.image);
      }}
      className={`border lg:cursor-pointer w-7 h-7 flex justify-center items-center font-sans font-medium rounded-full bg-white ${
        text === select ? "select-color" : "border-gray-300"
      }`}
    >
      <div
        style={{ backgroundColor: text }}
        className="w-5 h-5 rounded-full"
      ></div>
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
        className="w-5 h-5 rounded-full"
      ></div>
    </div>
  );
};
