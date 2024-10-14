"use client";
import useTheme from "@/hooks/use-theme";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import RegisterEleven from "./register/register-eleven";
import RegisterFive from "./register/register-five";
import RegisterFour from "./register/register-four";
import RegisterSeven from "./register/register-seven";
import RegisterOne from "./register/register-one";

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

  const Component = componentMap[design?.login_page];

  return Component ? <Component /> : null;
};

export default Register;
