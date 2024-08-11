import Link from "next/link";
import React from "react";

const MyAccount = ({ cls }: any) => {
  return (
    <>
      <Link href="/profile" className={cls}>
        <p>My Account</p>
      </Link>
      <Link href="/login" className={cls}>
        <p>Login</p>
      </Link>
      <Link href="/sign-up" className={cls}>
        <p>Register</p>
      </Link>
      <Link href="/checkout" className={cls}>
        <p>Checkout</p>
      </Link>
    </>
  );
};

export default MyAccount;
