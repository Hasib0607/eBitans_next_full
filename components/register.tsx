"use client";
import React, { useEffect } from "react";
import RegisterOne from "./register/register-one";
import RegisterFour from "./register/register-four";
import RegisterFive from "./register/register-five";
import RegisterSeven from "./register/register-seven";
import RegisterEleven from "./register/register-eleven";
import useTheme from "@/hooks/use-theme";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const componentMap: any = {
  one: RegisterOne,
  two: RegisterFour,
  three: RegisterFour,
  four: RegisterFour,
  five: RegisterFive,
  seven: RegisterSeven,
  eleven: RegisterEleven,
  fourteen: RegisterSeven,
  fifteen: RegisterSeven,
  sixteen: RegisterFour,
  seventeen: RegisterFour,
  eighteen: RegisterFive,
  nineteen: RegisterSeven,
  twenty: RegisterSeven,
  twentyone: RegisterFour,
  twentytwo: RegisterFour,
  twentythree: RegisterFour,
  twentyfour: RegisterFour,
  twentyfive: RegisterSeven,
  twentysix: RegisterSeven,
  twentyseven: RegisterFour,
  twentyeight: RegisterFour,
  twentynine: RegisterFour,
  thirty: RegisterFour,
  thirtyone: RegisterFour,
  thirtythree: RegisterFour,
  thirtyfour: RegisterFive,
  thirtyfive: RegisterFive,
};

const Register = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const { design, store } = useTheme();

  useEffect(() => {
    if (user?.verify) {
      router.push("/");
    } else if (store?.auth_type === "EasyOrder") {
      router.push("/login");
    }
  }, [user, router]);

  console.log(user, "user from register");

  const Component = componentMap[design?.login_page];

  return Component ? <Component /> : null;
};

export default Register;
