"use client";
import React, { useEffect } from "react";
import LoginOne from "./sign-in/signin-one";
import LoginFour from "./sign-in/signin-four";
import LoginSeven from "./sign-in/signin-seven";
import LoginFive from "./sign-in/signin-five";
import LoginEleven from "./sign-in/signin-eleven";
import LoginTwentyOne from "./sign-in/signin-twentyone";
import LoginTwentyNine from "./sign-in/signin-twentynine";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import useTheme from "@/hooks/use-theme";

const themeMapping: any = {
  default: LoginOne,
  one: LoginOne,
  two: LoginFour,
  three: LoginSeven,
  four: LoginFour,
  five: LoginFive,
  seven: LoginSeven,
  eight: LoginFive,
  eleven: LoginEleven,
  fourteen: LoginSeven,
  fifteen: LoginSeven,
  sixteen: LoginFour,
  seventeen: LoginFour,
  eighteen: LoginFive,
  nineteen: LoginSeven,
  twenty: LoginSeven,
  twentyone: LoginTwentyOne,
  twentytwo: LoginEleven,
  twentythree: LoginTwentyOne,
  twentyfour: LoginTwentyOne,
  twentyfive: LoginSeven,
  twentysix: LoginTwentyOne,
  twentyseven: LoginTwentyOne,
  twentyeight: LoginTwentyOne,
  twentynine: LoginTwentyNine,
  thirty: LoginTwentyNine,
  thirtyone: LoginTwentyNine,
  thirtyfive: LoginTwentyNine,
};

const Signin = () => {
  const { design } = useTheme();
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user?.verify) {
      router.push("/");
    }
  }, [user, router]);

  const SelectedLoginComponent = themeMapping[design?.login_page] || LoginOne;

  return <SelectedLoginComponent />;
};

export default Signin;
