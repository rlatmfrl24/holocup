import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-slate-200 py-3 px-5 flex-1 h-full font-poppins flex flex-col text-xl">
      <h1 className="text-4xl font-semibold py-3">๐จNotice!๐จ</h1>
      <div className="font-noto_kr">
        <p>์ด ํ์ด์ง๋ ํ๋ก๋ผ์ด๋ธ์ ๊ด๋ จ์๋ ํฌํ์ด์ง์๋๋ค.</p>
        <p>
          ๋ฐ์ดํฐ์ ์ถ์ฒ๋{" "}
          <Link href={`/source`}>
            <span className="text-orange-500 underline cursor-pointer">
              ์ฌ๊ธฐ
            </span>
          </Link>
          ์์ ํ์ธํ  ์ ์์ต๋๋ค.
        </p>
        <p>
          ์ถ๊ฐํ๊ณ  ์ถ์ ๊ธฐ๋ฅ์ด๋ ๋ฒ๊ทธ ๋ฆฌํฌํธ๋ &nbsp;
          <span className=" font-semibold underline font-poppins">
            397love@gmail.com
          </span>
          &nbsp;์ผ๋ก ๋ณด๋ด์ฃผ์ธ์.
        </p>
        <p>ํ์ฌ ๋ชจ๋ฐ์ผ ๋ฒ์ ์ ์ค๋น์ค์๋๋ค. PCํ๋ฉด์ ์ต์ ํ๋ ํ์ด์ง์๋๋ค.</p>
      </div>

      <div className="mt-5">
        <p>
          This page is <span className="font-bold text-red-500">NOT </span>
          hololive offical page. This page is made by fans.
        </p>
        <p>
          {" "}
          The source of the data can be found{" "}
          <Link href={`/source`}>
            <span className="text-orange-500 underline cursor-pointer">
              here
            </span>
          </Link>
          .
        </p>
        <p>
          Any feature you want to add or Bug reports, Please send me E-mail to
          &nbsp;
          <span className=" font-semibold underline">397love@gmail.com</span>
        </p>
        <p>
          Currently, the mobile version is under development. This page is
          optimized for PC screen.
        </p>
      </div>

      <h1 className="text-4xl font-semibold py-3 mt-6">How to Use</h1>
      <div className="font-noto_kr">
        <p>ํ์ธํ๊ณ  ์ถ์ ๋ฐ์ดํฐ๋ฅผ ์ข์ธก ๋ฉ๋ด์์ ์ ํํด์ฃผ์ธ์.</p>
        <p>
          ์น๋ถ์์ธก ๋ฐ ๊ฒฐ๊ณผ ํ์ธ ํ์ด์ง๋ ๋ค์ ๋ํ ์ฃผ์ต๊ฐ ๊ฒฐ์ ๋๋ฉด ์์ฑ๋ฉ๋๋ค.
        </p>
      </div>

      <div className="mt-5">
        <p>Please select the data you want to check from the left menu.</p>
        <p>
          The prediction and result page will be created when the next
          tournament is decided.
        </p>
      </div>
    </main>
  );
}
