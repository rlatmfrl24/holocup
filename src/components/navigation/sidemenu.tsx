import { NextPage } from "next";
import Link from "next/link";

const SideMenu: NextPage = () => {
  type SideMenuType = {
    name: string;
    link: string;
  };

  const sideMenuList: SideMenuType[] = [
    {
      name: "home",
      link: "/",
    },
    {
      name: "competitions",
      link: "/competitions",
    },
    {
      name: "round DB",
      link: "/rounds",
    },
    {
      name: "member DB",
      link: "/member",
    },
  ];

  function toUpperCaseFirstChar(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div
      aria-label="sidemenu"
      className="bg-primary-200 shadow hidden md:block font-poppins"
    >
      <ul>
        {sideMenuList.map((item) => (
          <Link key={item.link} href={item.link}>
            <li className="px-3 py-3 text-base font-semibold hover:bg-primary-300 pr-8 ">
              {toUpperCaseFirstChar(item.name)}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
