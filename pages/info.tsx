import Layout from "../components/layout";
import Image from "next/image";

const InfoPage = () => {
  return (
    <Layout>
      <div className="flex-1 bg-slate-200 p-3 gap-3 grid grid-cols-3 font-noto_kr">
        <div className="flex col-span-2 bg-slate-100 flex-col gap-5 items-center justify-center p-3 shadow rounded">
          <Image
            src="/images/Logo.png"
            alt="hololive"
            width={240}
            height={240}
          />
          <div className="font-semibold text-3xl">홀로라이브 정월컵 2023</div>
          <span className="text-xl font-bold">2023년 1월 7일 오후 2시</span>
          <div className="flex gap-3">
            <div className="rounded shadow-md flex-1 flex flex-col text-center p-4">
              <span className="font-bold mb-3">참가 인원</span>
              <span className="flex flex-1 justify-center items-center text-6xl font-bold">
                36
              </span>
            </div>
            <div className="rounded shadow-md flex-1 flex flex-col text-center p-4">
              <span className="font-bold mb-3">경기 종목</span>
              <Image
                className="flex-1"
                src="/images/logo-mk8.png"
                alt="mk8"
                width={240}
                height={240}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="rounded shadow-md flex-1 flex flex-col items-center text-center p-4">
              <span className="font-bold mb-3">대회 주관</span>
              <Image
                className="flex-1"
                src="/images/towa.png"
                alt="mk8"
                width={120}
                height={120}
              />
            </div>
          </div>
        </div>
        <div className="bg-slate-100 rounded shadow">Time Table</div>
      </div>
    </Layout>
  );
};

export default InfoPage;
