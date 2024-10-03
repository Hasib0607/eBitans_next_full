"use client";
import React from "react";
import { css } from "@emotion/react";
import {
  InfinitySpin,
  RotatingSquare,
  Rings,
  ThreeDots,
} from "react-loader-spinner";
import { motion } from "framer-motion";
import useTheme from "@/hooks/use-theme";
import { imgUrl } from "@/site-settings/siteUrl";

const LoaderOne = () => {
  const { header_color, text_color, logo, website_name } = useTheme();

  return (
    <div
      className="flex justify-center min-h-screen min-w-screen items-center"
      style={{ backgroundColor: header_color, color: text_color }}
    >
      <div className="flex flex-col justify-center items-center">
        {logo ? (
          <img className="w-auto h-16 mx-auto" src={imgUrl + logo} alt="" />
        ) : (
          <h2 className="font-bold text-center" style={{ color: text_color }}>
            {website_name}
          </h2>
        )}
        <Rings
          color={`${text_color}`}
          height={"200"}
          width={"200"}
          ariaLabel="loading-indicator"
        />
      </div>
    </div>
  );
};
const LoaderTwo = () => {
  const { header_color, text_color, logo, website_name } = useTheme();

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{ backgroundColor: header_color, color: text_color }}
    >
      <div className="flex flex-col justify-center items-center">
        {logo ? (
          <img className="w-auto h-10" src={imgUrl + logo} alt="" />
        ) : (
          <h2 className="font-bold text-center" style={{ color: text_color }}>
            {website_name}
          </h2>
        )}
        <div className="flex justify-center items-center">
          <RotatingSquare
            color={`${text_color}`}
            height={"200"}
            width={"200"}
            ariaLabel="loading-indicator"
          />
        </div>
      </div>
    </div>
  );
};
const LoaderThree = () => {
  const { header_color, text_color, logo, website_name } = useTheme();

  return (
    <div
      className="flex justify-center h-screen items-center"
      style={{ backgroundColor: header_color, color: text_color }}
    >
      <div className="flex flex-col justify-center items-center">
        {logo ? (
          <img className="w-auto h-16 mx-auto" src={imgUrl + logo} alt="" />
        ) : (
          <h2 className="font-bold text-center" style={{ color: text_color }}>
            {website_name}
          </h2>
        )}

        <InfinitySpin
          color={`${text_color}`}
          // height={"200"}
          width={"200"}
          // ariaLabel="loading-indicator"
        />
      </div>
    </div>
  );
};

// const LoaderFour = () => {
//   const { header_color, text_color, logo, website_name } = useTheme();
//   const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: ${text_color};
//   `;
//   return (
//     <div
//       className="flex justify-center h-screen items-center"
//       style={{ backgroundColor: header_color, color: text_color }}
//     >
//       <div className="">
//         {logo ? (
//           <img
//             className="w-auto h-16 mx-auto mb-5"
//             src={imgUrl + logo}
//             alt=""
//           />
//         ) : (
//           <h2 className="font-bold text-center" style={{ color: text_color }}>
//             {website_name}
//           </h2>
//         )}

//         <ThreeDots color="#000" css={override} />
//       </div>
//     </div>
//   );
// };
// const LoaderFive = () => {
//   const { header_color, text_color, logo, website_name } = useTheme();
//   const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: ${text_color};
//   `;
//   return (
//     <div
//       className="flex justify-center h-screen items-center"
//       style={{ backgroundColor: header_color, color: text_color }}
//     >
//       <div className="">
//         {logo ? (
//           <img
//             className="w-auto h-16 mx-auto mb-5"
//             src={imgUrl + logo}
//             alt=""
//           />
//         ) : (
//           <h2 className="font-bold text-center" style={{ color: text_color }}>
//             {website_name}
//           </h2>
//         )}

//         <CircleLoader size={65} color="#000" css={override} />
//       </div>
//     </div>
//   );
// };
// const LoaderSix = () => {
//   const { header_color, text_color, logo, website_name } = useTheme();
//   const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: ${text_color};
//   `;
//   return (
//     <div
//       className="flex justify-center h-screen items-center"
//       style={{ backgroundColor: header_color, color: text_color }}
//     >
//       <div className="">
//         {logo ? (
//           <img
//             className="w-auto h-16 mx-auto mb-5"
//             src={imgUrl + logo}
//             alt=""
//           />
//         ) : (
//           <h2 className="font-bold text-center" style={{ color: text_color }}>
//             {website_name}
//           </h2>
//         )}

//         <BarLoader size={95} color="#000" css={override} width={400} />
//       </div>
//     </div>
//   );
// };

// const LoaderSeven = () => {
//   const { header_color, text_color } = useTheme();
//   return (
//     <div
//       className="flex flex-col"
//       style={{ backgroundColor: header_color, color: text_color }}
//     >
//       <motion.div
//         initial={{ y: 0 }}
//         animate={{ y: "-100%" }}
//         transition={{ duration: 0.6, ease: "linear", delay: 2 }}
//         style={{ backgroundColor: header_color, color: text_color }}
//         className="h-[50vh] w-full"
//       ></motion.div>
//       <div className="w-full flex justify-center">
//         <motion.div
//           initial={{ width: 100 }}
//           animate={{ width: 600, transitionEnd: { display: "none" } }}
//           transition={{ duration: 2, ease: "linear" }}
//           className="h-[2px]  bg-black"
//         ></motion.div>
//       </div>
//       <motion.div
//         style={{ backgroundColor: header_color, color: text_color }}
//         initial={{ y: 0 }}
//         animate={{ y: "100%" }}
//         transition={{ duration: 0.6, ease: "linear", delay: 2 }}
//         className="h-[50vh] w-full"
//       ></motion.div>
//     </div>
//   );
// };
// const LoaderEight = () => {
//   const { header_color, text_color } = useTheme();

//   const StyleCss = `

//     .loading {
//         font-family: "Arial Black", "Arial Bold", Gadget, sans-serif;
//         text-transform:uppercase;

//         width:350px;
//         text-align:center;
//         line-height:50px;

//         position:absolute;
//         left:0;right:0;top:50%;
//         margin:auto;
//         transform:translateY(-50%);
//     }

//     .loading span {
//         position:relative;
//         z-index:999;
//         color:white;
//         font-size: 40px;
//     }
//     .loading:before {
//         content:'';
//         background:black;
//         width:250px;
//         height:70px;
//         display:block;
//         position:absolute;
//         top:0;left:0;right:0;bottom:0;
//         margin:auto;

//         animation:2s loadingBefore infinite ease-in-out;
//     }

//     @keyframes loadingBefore {
//         0%   {transform:translateX(-14px);}
//         50%  {transform:translateX(14px);}
//         100% {transform:translateX(-14px);}
//     }

//     .loading:after {
//         content:'';
//         background:white;
//         width:20px;
//         height:100px;
//         display:block;
//         position:absolute;
//         top:0;left:0;right:0;bottom:0;
//         margin:auto;
//         opacity:.5;

//         animation:2s loadingAfter infinite ease-in-out;
//     }

//     @keyframes loadingAfter {
//         0%   {transform:translateX(-50px);}
//         50%  {transform:translateX(50px);}
//         100% {transform:translateX(-50px);}
//     }
//     `;
//   return (
//     <div
//       style={{ backgroundColor: header_color, color: text_color }}
//       className="h-[100vh] w-full"
//     >
//       <style>{StyleCss}</style>
//       <div className="loading">
//         <span>Loading</span>
//       </div>
//     </div>
//   );
// };

// const LoaderNine = () => {
//   const { header_color, text_color, logo } = useTheme();
//   const StyleCss = `
//     .image-animate {
//         animation: MoveUpDown 2s linear infinite;
//       }

//     @keyframes MoveUpDown {
//         0%, 100% {
//           bottom: 0;
//         }
//         50% {
//           bottom: 20px;
//         }
//       }
//     `;
// return (
//   <div
//     className="flex flex-col items-center justify-center h-screen w-full"
//     style={{ backgroundColor: header_color, color: text_color }}
//   >
//     <style>{StyleCss}</style>
//     <div className="image-animate relative">
//       <img src={imgUrl + logo} alt="" className="sm:h-32 h-24" />
//     </div>
//   </div>
// );

export { LoaderOne, LoaderTwo, LoaderThree };
