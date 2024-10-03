import Image from "next/image";
import images from "../lib/images";

const Loading = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <Image src={images.darkLogo} className="h-10 w-auto" alt="EbitansLogo" />
    </div>
  );
};

export default Loading;
