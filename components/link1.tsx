"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const Link1 = ({ text, href }: any) => {
  return (
    <motion.li
      whileHover={{
        x: 8,
        transition: { duration: 0.5 },
        color: "#f27820",
      }}
      exit={{
        x: 0,
        transition: { duration: 0.5 },
      }}
    >
      <Link href={href} className="text-gray-600">
        {text}
      </Link>
    </motion.li>
  );
};

export default Link1;
