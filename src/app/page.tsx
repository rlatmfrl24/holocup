import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-slate-200 py-3 px-5 flex-1 h-full font-poppins flex flex-col text-xl">
      <h1 className="text-4xl font-semibold py-3">🚨Notice!🚨</h1>
      <div className="font-noto_kr">
        <p>이 페이지는 홀로라이브와 관련없는 팬페이지입니다.</p>
        <p>
          데이터의 출처는{" "}
          <Link href={`/source`}>
            <span className="text-orange-500 underline cursor-pointer">
              여기
            </span>
          </Link>
          에서 확인할 수 있습니다.
        </p>
        <p>
          추가하고 싶은 기능이나 버그 리포트는 &nbsp;
          <span className=" font-semibold underline font-poppins">
            397love@gmail.com
          </span>
          &nbsp;으로 보내주세요.
        </p>
        <p>현재 모바일 버전은 준비중입니다. PC화면에 최적화된 페이지입니다.</p>
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
        <p>확인하고 싶은 데이터를 좌측 메뉴에서 선택해주세요.</p>
        <p>
          승부예측 및 결과 확인 페이지는 다음 대회 주최가 결정되면 생성됩니다.
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
