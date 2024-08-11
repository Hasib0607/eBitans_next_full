"use client";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { AiFillLinkedin } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoLogoWhatsapp } from "react-icons/io5";
import { GrInstagram, GrYoutube } from "react-icons/gr";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import HeaderTwentyNineMenu from "./header-twentynine-menu";
import HeaderTwentyNineCat from "./header-twentynine-cat";
import useTheme from "@/hooks/use-theme";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const HeaderTwentyNine = () => {
  const { design, headerSetting, menu } = useTheme();
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);

  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const changeNavbar = () => {
      if (window.scrollY >= 90) {
        setOpenMenu(true);
      } else {
        setOpenMenu(false);
      }
    };
    window.addEventListener("scroll", changeNavbar);
  }, []);

  const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin&display=swap');

    .all-hover:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }
    .menu-hover:hover {
      color:  ${design?.header_color};
     
  }
    .border-hover:hover {
      border: 1px solid ${design?.header_color};
     
  }
    .border-hover-bottom:hover {
      border-bottom: 2px solid ${design?.header_color};
     
  }
  
  .font-six {
    font-family: 'Libre Franklin', sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6, li, ul, a, p, span, button, option, select, input, div {
    font-family: 'Libre Franklin', sans-serif;
  }

    `;

  return (
    <div>
      <style>{styleCss}</style>
      <div
        style={{ background: design?.header_color, color: design?.text_color }}
        className="pb-1 lg:border-b border-gray-300"
      >
        <div className="lg:flex hidden pt-3 sm:container px-5 justify-between">
          <div>
            <p className="text-sm">Need Help? {headerSetting?.phone}</p>
          </div>

          <div className="flex gap-3 items-center">
            {/* My account dropdown menu start */}
            <div className="">
              <Menu as="div" className="relative inline-block text-left ">
                <div>
                  {user?.verify ? (
                    <Menu.Button
                      style={{ color: design?.text_color }}
                      className="inline-flex items-center justify-center w-full"
                    >
                      My Account
                      <ChevronDownIcon
                        className="h-3 ml-1 mt-1"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  ) : (
                    <Menu.Button
                      style={{ color: design?.text_color }}
                      className="inline-flex items-center justify-center w-full"
                    >
                      Login
                      <ChevronDownIcon
                        className="h-3 ml-1 mt-1"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  )}
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {user?.verify ? (
                        <div>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                My account
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/checkout"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Checkout
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <div>
                                <Link
                                  href="/login"
                                  // onClick={() => dispatch(logout())}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Sign out
                                </Link>
                              </div>
                            )}
                          </Menu.Item>
                        </div>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/login"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Sign in
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            {/* My account dropdown menu finished */}
            <div style={{ color: design?.text_color }}>|</div>
            <div
              style={{ color: design?.text_color }}
              className="flex gap-2 items-center"
            >
              {headerSetting?.facebook_link && (
                <a
                  href={headerSetting?.facebook_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-lg " />
                </a>
              )}

              {headerSetting?.whatsapp_phone && (
                <a
                  href={
                    "https://api.whatsapp.com/send?phone=" +
                    headerSetting?.whatsapp_phone
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoWhatsapp className="text-lg " />
                </a>
              )}

              {headerSetting?.instagram_link && (
                <a
                  href={headerSetting?.instagram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GrInstagram className="text-lg " />
                </a>
              )}

              {headerSetting?.youtube_link && (
                <a
                  href={headerSetting?.youtube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GrYoutube className="text-lg " />
                </a>
              )}
              {headerSetting?.lined_in_link && (
                <a
                  href={headerSetting?.lined_in_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillLinkedin className="text-lg " />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <HeaderTwentyNineMenu />
      <HeaderTwentyNineCat />

      {/* sticky nav  */}
      <div
        className={`hidden ${
          openMenu ? "stickyNav openMenu bg-gray-100" : "stickyNav"
        }`}
      >
        <div className="hidden lg:flex items-center sm:container px-5 py-4">
          <div>
            <ul className="lg:flex lg:flex-row lg:gap-8 hidden ">
              {menu.map((item: any) => (
                <div key={item.id} className="">
                  <li>
                    <Link href={item.url}>
                      <h1 className="flex uppercase justify-between items-center group font-semibold text-sm menu-hover">
                        {item.name}
                      </h1>
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTwentyNine;
