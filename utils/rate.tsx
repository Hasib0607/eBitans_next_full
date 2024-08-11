import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";

const Rate = ({ rating }: any) => {
  //   const { design } = useTheme();

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Rating
        className="text-warning sm:text-sm text-xs"
        initialRating={rating}
        emptySymbol={<AiOutlineStar color={"#FBC029"} />}
        fullSymbol={<AiFillStar color={"#FBC029"} />}
        readonly
      />
    </>
  );
};

export default Rate;
