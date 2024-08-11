"use client";
import LeftSide from "@/components/dashboard/left-side";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";

const ProfileLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!user?.verify) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="sm:container px-5 pt-8">
      <div className="md:grid md:grid-cols-3 md:gap-6 pt-3 pb-6">
        <LeftSide />
        <div className="mt-5 md:mt-0 md:col-span-2">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
