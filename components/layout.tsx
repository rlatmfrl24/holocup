import { NextPage } from "next";
import { ReactNode } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

const Header: NextPage = () => {
  return (
    <div className="bg-third-600 text-secondary p-3 items-center flex gap-3 font-poppins font-semibold fixed w-full">
      <button>
        <span className="material-symbols-outlined text-3xl hover:bg-third-500 p-2 rounded-full h-10 w-10 flex justify-center items-center">
          menu
        </span>
      </button>
      <Link href={"/"}>
        <div className="flex flex-1 flex-col md:flex-row md:gap-3 text-2xl md:text-4xl">
          <Image
            src={`/images/hololive.svg`}
            alt="hololive"
            width={120}
            height={120}
          />
          New Year Cup 2023
        </div>
      </Link>
    </div>
  );
};

const SideMenu: React.FC = () => {
  type MenuType = {
    title: string;
    link: string;
  };

  const menus: MenuType[] = [
    { title: "대회 정보", link: "/info" },
    { title: "대회 규칙", link: "/rules" },
    { title: "참가자 정보", link: "/participants" },
    { title: "승부 예측", link: "/prediction" },
    { title: "버그 제보", link: "/bug" },
  ];

  const MenuItem: React.FC<{ menu: MenuType }> = ({ menu }) => {
    return (
      <Link href={menu.link}>
        <div className="text-secondary font-bold hover:font-extrabold text-xl m-3 p-2 cursor-pointer rounded hover:bg-third-600 font-noto_kr">
          {menu.title}
        </div>
      </Link>
    );
  };

  return (
    <div className="w-48 bg-third-700">
      {menus.map((menu, index) => (
        <MenuItem key={index} menu={menu} />
      ))}
    </div>
  );
};

const Layout: NextPage<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col ">
      <Head>
        <title>HoloCup 2023</title>
      </Head>
      <Header />
      <div className="pt-24 md:pt-16 flex flex-1">
        <SideMenu />
        {children}
      </div>
    </div>
  );
};

export default Layout;
