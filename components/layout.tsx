import { NextPage } from "next";
import { ReactNode } from "react";
import Image from "next/image";

const Layout: NextPage<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-third-600 text-4xl text-secondary p-5 items-center flex gap-3 font-poppins font-semibold">
        <Image
          src={`/images/hololive.svg`}
          alt="hololive"
          width={120}
          height={120}
        />
        New Year Cup 2022
      </div>
      {children}
    </div>
  );
};

export default Layout;
