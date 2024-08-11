"use client";

import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RiMenu2Line } from "react-icons/ri";
import img from "@/assets/custom_menu_icon.png";
import useTheme from "@/hooks/use-theme";
import Link from "next/link";
import {
  ShoppingBagIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { LogoutIcon } from "assets/svgComp";
import { iconImg, imgUrl } from "@/site-settings/siteUrl";
import { logout } from "@/redux/features/auth.slice";

const HeaderThirteen = () => {
  return (
    <div>
      <HeaderTop />
      <HeaderDown />
    </div>
  );
};

export default HeaderThirteen;

const HeaderTop = () => {
  const { design, headerSetting } = useTheme();
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (window !== undefined) {
      window.localStorage.removeItem("persist:root");
      console.log("Item removed from localStorage");
      window.location.href = "/";
    }
  };

  return (
    <div
      style={{
        backgroundColor: design?.header_color,
        color: design?.text_color,
      }}
    >
      <div className="sm:container px-5 flex justify-between items-center">
        <div className="flex items-center justify-start">
          <p>Welcome to {headerSetting?.website_name} !</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={"/profile"}>
            <SigleIcon Icon={UserGroupIcon} text={"my account"} />
          </Link>
          <Link href={"/checkout"}>
            <SigleIcon Icon={ShoppingBagIcon} text={"Checkout"} />
          </Link>
          {user?.verify ? (
            <SigleIcon
              onClick={handleClick}
              Icon={LogoutIcon}
              text={"Logout"}
            />
          ) : (
            <Link href={"/login"}>
              <SigleIcon Icon={UserIcon} text={"Login"} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const SigleIcon = ({ onClick, Icon, text }: any) => {
  const [show, setShow] = useState(false);
  const { design } = useTheme();
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={`flex gap-1 items-center  py-2  ${
        show ? "bg-red-500 px-4 py-2" : "px-1"
      } transition-all duration-500 ease-linear`}
    >
      <Icon
        className="h-6 w-6"
        color={show ? design?.header_color : design?.text_color}
      />
      <p
        className={`capitalize text-white ${
          show ? "visible opacity-100 flex" : "invisible opacity-0 hidden"
        } transition-all duration-200 ease-linear`}
      >
        {text}
      </p>
    </div>
  );
};

const colors = [
  "#40af64",
  "#6e45a7",
  "#f7be24",
  "#de5648",
  "#4775c9",
  "#23b4ca",
  "#91c547",
];
const HeaderDown = () => {
  const { headerSetting, category, menu } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="sm:container px-5 lg:h-[120px] h-12 flex justify-between items-center my-2">
        <div className="max-w-[200px] w-[80px] xl:w-auto h-full overflow-hidden flex items-center">
          {headerSetting?.logo ? (
            <Link href="/">
              <img
                src={imgUrl + headerSetting?.logo}
                className="lg:h-[120px] h-12"
                alt=""
              />
            </Link>
          ) : (
            <Link href="/">{headerSetting?.website_name}</Link>
          )}
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="lg:cursor-pointer lg:hidden block"
        >
          <RiMenu2Line className="text-4xl menu-hover text-black" />
        </div>
        <div className="hidden lg:flex space-x-3 mt-2">
          {category?.slice(0, 5).map((item: any, id: any) => (
            <Link href={"/category/" + item?.id} key={item?.id}>
              <SingleCats item={item} color={colors[id]} />
            </Link>
          ))}

          <SingleCats item={{ name: "pages", cat: menu }} color={"#91C547"} />
        </div>
      </div>

      {/* tablet and mobile view  */}
      {/* on screen touch menu hide  */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
        ></div>
      )}

      <div className={`px-4 z-[7]`}>
        <ul
          className={`pt-5 top-0 bg-white duration-500 fixed md:w-96 w-64 sm:w-80 overflow-y-auto bottom-0 pb-5 z-[7] lg:cursor-pointer ${
            open ? "left-0 " : "left-[-140%] "
          }`}
        >
          <div className="pb-7 pt-3 px-6">
            <div className=" text-xl border-b-[2px] pb-5 text-center text-color">
              Menu
            </div>
            <div className="flex flex-col gap-3 md:w-[40%] w-[90%] mt-4">
              {menu?.map((item: any) => (
                <SingleCat item={item} setOpen={setOpen} key={item?.id} />
              ))}
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

const SingleCats = ({ item, color }: any) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="duration-300 transition-all ease-linear p-1 flex flex-col gap-2 justify-center items-center w-[120px] lg:h-[120px] h-12  relative"
        style={{ backgroundColor: color }}
      >
        {item?.icon ? (
          <img
            className="h-[50px] w-[50px]"
            src={iconImg + item?.icon}
            alt=""
          />
        ) : (
          <img className="h-[50px] w-[50px]" src={img.src} alt="" />
        )}
        <p className="text-white text-sm tracking-tight capitalize font-medium text-center">
          {item?.name}
        </p>
        <div
          className={` absolute top-[80px] xl:top-[120px] right-0 bg-white shadow-md rounded-md z-20  ${
            show
              ? "visible opacity-100 block min-w-[200px]"
              : "invisible opacity-0 hidden"
          } duration-300 transition-all ease-linear`}
        >
          <ul className={`list-none ${item?.cat && "p-2"}`}>
            {item?.cat &&
              item?.cat?.map((sub: any) => (
                <Link
                  href={sub?.url ? "/" + sub?.url : "/category/" + sub?.id}
                  key={sub?.id}
                  className="px-2 py-2 mx-2 hover:bg-gray-200 hover:scale-[1.05] transition-all duration-300 ease-linear rounded-md flex gap-2"
                >
                  {sub?.icon && (
                    <div className="h-6 w-6">
                      <img
                        className="w-full h-full"
                        src={iconImg + sub?.icon}
                        alt=""
                      />
                    </div>
                  )}
                  <p>{sub?.name !== "Home" ? sub?.name : null}</p>
                </Link>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const SingleCat = ({ item, setOpen }: any) => {
  return (
    <>
      <div className="w-full flex py-2 lg:cursor-pointer">
        <Link
          onClick={() => setOpen(false)}
          href={item.url}
          className="flex-1 text-sm text-gray-900 font-medium"
        >
          {" "}
          <p>{item.name}</p>
        </Link>
      </div>
    </>
  );
};
