"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="Airbnb"
      className="hidden md:block cursor-pointer"
      height="100"
      width="100"
      src="/images/airbnb.svg"
    />
  );
};

export default Logo;
