import Header from "@/components/navigation/header";
import SideMenu from "@/components/navigation/sidemenu";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="h-screen flex flex-col">
        <Header />
        <div className="flex flex-1">
          <SideMenu />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
