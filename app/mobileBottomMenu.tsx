"use client";

import dynamic from "next/dynamic";
import useTheme from "@/hooks/use-theme";
import { ComponentType } from "react";

const mobileNavs: { [key: string]: ComponentType<{}> } = {
  one: dynamic(() => import("./mobileNavs/one/mobileNavOne"), { ssr: false }),
  two: dynamic(() => import("./mobileNavs/two/mobileNavTwo"), { ssr: false }),
  three: dynamic(() => import("./mobileNavs/three/mobileNavThree"), {
    ssr: false,
  }),
  four: dynamic(() => import("./mobileNavs/four/mobileNavFour"), {
    ssr: false,
  }),
  five: dynamic(() => import("./mobileNavs/five/mobileNavFive"), {
    ssr: false,
  }),
};

interface Design {
  mobile_bottom_menu?: "one" | "two" | "three" | "four" | "five";
}

const AllMobileBottomMenu = () => {
  const theme = useTheme();
  const design = theme?.design;

  const MobileNavComponent =
    mobileNavs[
      design?.mobile_bottom_menu ||
        design?.mobile_bottom_menu == "default" ||
        "four"
    ];

  return <>{MobileNavComponent && <MobileNavComponent />}</>;
};

export default AllMobileBottomMenu;
