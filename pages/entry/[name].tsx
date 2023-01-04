import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Image from "next/image";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Link from "next/link";

type EntryData = {
  name_kr: string;
  code: string;
  race_code: string;
  cup_code: string;
  cup_name: string;
  rank: number;
  point: number;
  race_results: number[];
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const code = context.params.name;
  const res = await fetch(`http://localhost:3000/api/entry/${code}`);
  const data: EntryData[] = await res.json();

  return { props: { data } };
};

function makeChartData(data: EntryData): any[] {
  let result: any[] = [];

  console.log(data);

  data.race_results.map((point, index) => {
    result.push({ name: "R" + (index + 1), 순위: point });
  });

  return result;
}

function convertRaceName(raceCode: string) {
  let raceName = "";

  if (raceCode.includes("pre_round")) {
    raceName = "예선전";
    const block = raceCode.replace("pre_round_", "").toUpperCase();
    raceName += ` ${block}블록`;
  } else if (raceCode === "championship") {
    raceName = "챔피언쉽";
  } else if (raceCode === "jako_round") {
    raceName = "자코컵";
  } else {
    raceName = "기타";
  }

  return raceName;
}

function makeRecordData(data: EntryData[]): string[] {
  return data.map((raceData) => {
    return (
      raceData.cup_name +
      " " +
      convertRaceName(raceData.race_code) +
      " " +
      raceData.rank +
      "위"
    );
  });
}

function calculateRankingPoint(data: EntryData[]): number {
  let point: number[] = [];

  data.forEach((raceData) => {
    let threshold;

    if (raceData.race_code.includes("pre_round")) {
      threshold = 1;
    } else if (raceData.race_code.includes("championship")) {
      threshold = 2;
    } else if (raceData.race_code.includes("jako_round")) {
      threshold = 0.5;
    } else {
      threshold = 0.75;
    }

    if (raceData.cup_code.includes("2020")) {
      threshold *= 0.8;
    } else if (raceData.cup_code.includes("2021")) {
      threshold *= 0.9;
    } else if (raceData.cup_code.includes("2022")) {
      threshold *= 1;
    }

    point.push(raceData.point * threshold);
  });

  //get average
  let sum = 0;
  point.forEach((p) => {
    sum += p;
  });

  let result = Math.round((sum / point.length) * 100) / 100;

  return result;
}

const EntryPage: NextPage<{ data: EntryData[] }> = ({ data }) => {
  return (
    <Layout>
      <div className="flex-1 m-2 flex flex-col gap-3\">
        <Link href={"/participants"}>
          <button className="p-3 flex items-center gap-2 font-bold font-noto_kr hover:bg-gray-200 rounded">
            <span className="material-symbols-outlined">arrow_back</span>뒤로
            가기
          </button>
        </Link>
        <div className="flex">
          <div className="rounded p-2">
            <Image
              alt={`test`}
              src={`/images/entry/${data[0].code}.png`}
              width={360}
              height={360}
            />
          </div>
          <div className="p-2 flex flex-col flex-1">
            <h1 className="font-noto_kr font-bold text-3xl mb-3">
              {data[0].name_kr}
            </h1>
            <div className="flex flex-col gap-3">
              <div className="flex justify-center gap-2 w-60">
                <h1 className="font-noto_kr font-bold text-2xl flex items-center ">
                  랭킹 포인트
                  <span className="material-symbols-outlined">help</span>
                </h1>
                <p className="font-poppins text-3xl font-bold flex-1 flex items-center">
                  {calculateRankingPoint(data)}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col justify-center gap-2 ">
                  <h1 className="font-noto_kr font-bold text-2xl border-b pb-1">
                    주요 대회 성적
                  </h1>
                  <p className="flex flex-col flex-1 justify-center">
                    {makeRecordData(data).map((record, index) => (
                      <span key={index} className="">
                        {record}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-noto_kr">
          <h1 className="font-bold text-2xl px-2 pb-2">대회 참가 기록</h1>
          <div aria-label="panel-area" className="grid grid-cols-2 gap-3">
            {data.map((raceData, index) => {
              return (
                <div
                  key={index}
                  className="px-3 py-2 rounded shadow font-noto_kr bg-white"
                >
                  <h2 className="font-bold text-xl border-b">
                    {raceData.cup_name +
                      " " +
                      convertRaceName(raceData.race_code)}{" "}
                  </h2>
                  <div className="flex">
                    <div className="grid grid-cols-2 gap-1 mt-2 h-fit flex-1">
                      <div className="font-bold">최종 순위</div>
                      <div className="text-center">{raceData.rank}</div>
                      <div className="font-bold">획득 포인트</div>
                      <div className="text-center">{raceData.point}</div>
                      <div className="font-bold w-fit">그룹 랭킹 포인트</div>
                      <div className="text-center">123</div>
                    </div>
                    <div className="flex-1">
                      <ResponsiveContainer
                        width="100%"
                        height={200}
                        className="z-0"
                      >
                        <LineChart
                          data={makeChartData(raceData)}
                          margin={{
                            top: 20,
                            right: 15,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <YAxis reversed hide domain={[1, 10]} />
                          <XAxis
                            dataKey="name"
                            padding={{ left: 20, right: 20 }}
                          />
                          <Line
                            autoReverse={true}
                            type="monotone"
                            dataKey="순위"
                            stroke="#000"
                            activeDot={{ r: 8 }}
                          />
                          <Tooltip />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="p-3">
            <h2 className="font-semibold text-xl">
              홀로라이브 정월컵 2020 - 예선전 B블록 5위(23점) / 츠요컵 공동 7위
              (15점)
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={makeChartData(data.career["2020"])}
                margin={{
                  top: 20,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" padding={{ left: 10, right: 10 }} />
                <YAxis
                  reversed
                  ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  domain={[1, 10]}
                  width={30}
                  padding={{ top: 10, bottom: 10 }}
                />
                <Line
                  autoReverse={true}
                  type="monotone"
                  dataKey="rank"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default EntryPage;
