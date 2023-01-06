import { NextPage } from "next";
import { ReactNode } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

const Header: NextPage = () => {
  return (
    <div className="bg-third-600 text-secondary p-3 items-center flex gap-3 font-poppins font-semibold fixed w-full z-30">
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
    { title: "역대 기록", link: "/records" },
    { title: "참가자 정보", link: "/participants" },
    { title: "승부 예측", link: "/login" },
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
    <div className="w-48 min-w-[12rem] bg-third-700">
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
      <div className="font-noto_kr font-semibold text-center bg-gray-200">
        해당 사이트는 팬 사이트로, 홀로라이브와 아무런 관련이 없습니다. 해당
        사이트의 데이터 출처는{" "}
        <Link href={"/"}>
          <span className="text-orange-600 hover:underline cursor-pointer">
            여기
          </span>
        </Link>
        에 명시되어 있습니다.
      </div>
    </div>
  );
};

export default Layout;
