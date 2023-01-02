import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Image from "next/image";
import { getMemberData } from "../api/entry";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const EntryPage: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;

  const memberData = getMemberData(name as string);

  const data_2020 = [
    {
      name: "예선 1R",
      rank: 7,
    },
    {
      name: "예선 2R",
      rank: 5,
    },
    {
      name: "예선 3R",
      rank: 5,
    },
    {
      name: "예선 4R",
      rank: 4,
    },
    {
      name: "츠요컵 1R",
      rank: 8,
    },
    {
      name: "츠요컵 2R",
      rank: 7,
    },
    {
      name: "츠요컵 3R",
      rank: 3,
    },
    {
      name: "츠요컵 4R",
      rank: 9,
    },
  ];

  return (
    <Layout>
      <div className="flex-1 m-2 flex flex-col gap-3">
        <div className="flex">
          <div className="rounded p-2">
            <Image
              alt={name as string}
              src={`/images/entry/${name}.png`}
              width={200}
              height={200}
            />
          </div>
          <div className="p-2 flex flex-col">
            <h1 className="font-noto_kr font-bold text-3xl">
              {memberData?.name_kr}
            </h1>
            <div className="flex-1 flex flex-col justify-center gap-2">
              <h1 className="font-noto_kr font-bold text-2xl">
                주요 대회 성적
              </h1>
              <p className="flex flex-col">
                <span className="">
                  홀로라이브 정월컵 2020
                  <span className="font-bold"> Championship 공동 7위</span>
                </span>
                <span className="">
                  홀로라이브 정월컵 2021
                  <span className="font-bold"> 하위리그 2위</span>
                </span>
                <span className="">
                  홀로라이브 정월컵 2022
                  <span className="font-bold"> 예선전 C블록 6위</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="p-2 flex flex-col font-noto_kr">
          <h1 className="font-bold text-2xl">역대 대회 참가 기록</h1>
          <div className="p-3">
            <h2 className="font-semibold text-xl">
              홀로라이브 정월컵 2020 - 예선전 B블록 5위(23점) / 츠요컵 공동 7위
              (15점)
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={data_2020}
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
          </div>
          <div className="p-3">
            <h2 className="font-semibold text-xl">
              홀로라이브 정월컵 2021 - 예선전 C블록 5위(18점) / 자코컵 2위(45점)
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={data_2020}
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EntryPage;
