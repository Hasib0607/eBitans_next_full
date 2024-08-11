import useTheme from "@/hooks/use-theme";
import Card12 from "../card/card12";
import Card14 from "../card/card14";
import Card15 from "../card/card15";
import Card16 from "../card/card16";
import Card21 from "../card/card21";
import Card22 from "../card/card22";
import Card23 from "../card/card23";
import Card29 from "../card/card29";
import Card46 from "../card/card46";
import Card47 from "../card/card47";
import Card54 from "../card/card54";
import Card7 from "../card/card7";
import ProductCardOne from "../card/product-card/product-card-one";
import ProductCardTwo from "../card/product-card/product-card-two";

const ProductCard = ({ item }: any) => {
  const { design } = useTheme();

  return (
    <>
      {design?.offer === "one" && <ProductCardOne item={item} />}
      {design?.offer === "two" && <Card16 item={item} />}
      {design?.offer === "three" && <Card23 item={item} />}
      {design?.offer === "four" && <ProductCardTwo item={item} />}
      {/* {design?.offer === "five" && <ProductCardFour item={item} />} */}
      {design?.offer === "six" && <Card7 item={item} />}
      {design?.offer === "seven" && <Card12 item={item} />}
      {design?.offer === "eight" && <Card14 item={item} />}
      {design?.offer === "nine" && <Card22 item={item} />}
      {design?.offer === "ten" && <Card15 item={item} />}
      {design?.offer === "eleven" && <Card21 item={item} />}
      {/* {design?.offer === "twelve" && <ProductCardFour item={item} />} */}
      {/* {design?.offer === "thirteen" && <ProductCardFour item={item} />} */}
      {design?.offer === "fourteen" && <Card29 item={item} />}
      {design?.offer === "sixteen" && <Card29 item={item} />}
      {/* {design?.offer === "seventeen" && <Card37 item={item} />} */}
      {design?.offer === "twentytwo" && <Card46 item={item} />}
      {design?.offer === "twentythree" && <Card47 item={item} />}
      {design?.offer === "thirtyone" && <Card54 item={item} />}
    </>
  );
};

export default ProductCard;
