"use client";
import useTheme from "@/hooks/use-theme";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import LoginEleven from "./sign-in/signin-eleven";
import LoginFive from "./sign-in/signin-five";
import LoginFour from "./sign-in/signin-four";
import LoginOne from "./sign-in/signin-one";
import LoginSeven from "./sign-in/signin-seven";
import LoginTwentyNine from "./sign-in/signin-twentynine";
import LoginTwentyOne from "./sign-in/signin-twentyone";

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
