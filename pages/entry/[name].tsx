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

type EntryData = {
  name_kr: string;
  code: string;
  career: CareerData;
  records: string[];
};

type CareerData = {
  [key: string]: YearData;
};

type YearData = {
  pre_round: RoundData;
  championship: RoundData;
  jako_round: RoundData;
};

type RoundData = {
  isEntry: boolean;
  group: string;
  point: number;
  rank: number;
  result: number[];
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const code = context.params.name;
  const res = await fetch(`http://localhost:3000/api/entry/${code}`);
  const data: EntryData = await res.json();

  return { props: { data } };
};

function makeChartData(data: YearData) {
  const preRoundData = data.pre_round.result.map((item, index) => {
    return {
      name: `예선 ${index + 1}R`,
      rank: item,
    };
  });

  const championshipData = data.championship.result.map((item, index) => {
    return {
      name: `본선 ${index + 1}R`,
      rank: item,
    };
  });

  const jakoRoundData = data.jako_round.result.map((item, index) => {
    return {
      name: `자코 ${index + 1}R`,
      rank: item,
    };
  });

  let chartData = [...preRoundData];
  if (data.championship.isEntry)
    chartData = [...chartData, ...championshipData];
  if (data.jako_round.isEntry) chartData = [...chartData, ...jakoRoundData];

  return chartData;
}

const YearDataComponent: React.FC<{ data: YearData; year: string }> = ({
  data,
  year,
}) => {
  return (
    <div className="p-3">
      <h2 className="font-semibold text-xl">
        홀로라이브 정월컵 {year} - 예선전 {data.pre_round.group}블록 5위(23점) /
        츠요컵 공동 7위 (15점)
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={makeChartData(data)}
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
  );
};

const EntryPage: NextPage<{ data: EntryData }> = ({ data }) => {
  console.log(makeChartData(data.career["2020"]));

  return (
    <Layout>
      <div className="flex-1 m-2 flex flex-col gap-3">
        <div className="flex">
          <div className="rounded p-2">
            <Image
              alt={`test`}
              src={`/images/entry/natsuiro_matsuri.png`}
              width={200}
              height={200}
            />
          </div>
          <div className="p-2 flex flex-col">
            <h1 className="font-noto_kr font-bold text-3xl">{data.name_kr}</h1>
            <div className="flex-1 flex flex-col justify-center gap-2">
              <h1 className="font-noto_kr font-bold text-2xl">
                주요 대회 성적
              </h1>
              <p className="flex flex-col">
                {data.records.map((record, index) => (
                  <span key={index} className="">
                    {record}
                  </span>
                ))}
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
          </div>
          <div className="p-3">
            <h2 className="font-semibold text-xl">
              홀로라이브 정월컵 2021 - 예선전 C블록 5위(18점) / 자코컵 2위(45점)
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={makeChartData(data.career["2021"])}
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
