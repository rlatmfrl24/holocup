import { MemberType, RoundDetailType } from "@/utils/typeDef";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEmphasizeMemberCodeStore } from "./store";

const RoundChart: NextPage<{
  roundData: RoundDetailType[];
  memberData: MemberType[];
}> = ({ roundData, memberData }) => {
  const emphasizeMemberCode = useEmphasizeMemberCodeStore(
    (state) => state.emphasizeMemberCode
  );
  const [chartData, setChartData] = useState<any[]>([]);
  function switchDataForChart(data: RoundDetailType[]) {
    type RoundResultType = Record<string, number>;

    const result: RoundResultType[] = [];

    const maxRounds = data.reduce(
      (max, member) => Math.max(max, member.race_results.length),
      0
    );

    for (let i = 1; i <= maxRounds; i++) {
      const roundData: RoundResultType = { race: i };
      data.forEach((member) => {
        let raceRank = member.race_results[i - 1];
        roundData[member.code] = raceRank > 0 ? raceRank : 13;
      });
      result.push(roundData);
    }

    return result;
  }

  function mappingMemberColorCode(code: string) {
    let color = `#000`;
    memberData.forEach((member) => {
      if (member.id === code) {
        color = member.color_primary;
      }
    });
    return color;
  }

  const makeCustomizedLabel = (props: any) => {
    const { x, y, stroke, value } = props;
    return (
      <text
        x={x}
        y={y}
        dy={-10}
        fill={stroke}
        fontSize={20}
        textAnchor="middle"
      >
        {value === 13 ? "실격" : value + "위"}
      </text>
    );
  };

  const makeTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-50 p-3 shadow-lg flex flex-col rounded">
          <p className="font-poppins text-lg font-semibold border-b mb-2">
            {"Race " + (label + 1)}
          </p>
          <div className="flex flex-col gap-1">
            {payload.map((data: any) => {
              const member = memberData.find((member) => {
                return member.id === data.name;
              });

              return (
                <p key={data.name} className="flex font-noto_kr">
                  <span
                    style={{
                      color: member?.color_primary,
                    }}
                  >
                    {member?.oshi_mark + ` ` + member?.name_kr}
                  </span>
                  <span className="flex-1 px-5"></span>
                  {data.value === 13 ? "실격" : data.value + `위`}
                </p>
              );
            })}
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    if (roundData) {
      setChartData(switchDataForChart(roundData));
    }
  }, [roundData]);

  return (
    <div className="flex my-3 px-2 flex-col">
      <ResponsiveContainer width={`100%`} height={400}>
        <LineChart data={chartData}>
          <Tooltip content={makeTooltipContent} />
          <XAxis
            padding={{ left: 20, right: 20 }}
            tickFormatter={(tick) => {
              return `Race ${tick + 1}`;
            }}
          />
          <YAxis
            padding={{ top: 20, bottom: 20 }}
            width={5}
            reversed
            domain={["dataMin", "dataMax"]}
            tick={false}
          />
          {roundData?.map((round) => {
            return (
              <Line
                className={`${
                  emphasizeMemberCode !== "" &&
                  emphasizeMemberCode !== round.code
                    ? "opacity-20"
                    : ""
                }`}
                type={`monotone`}
                key={round.code}
                dataKey={round.code}
                strokeWidth={emphasizeMemberCode === round.code ? 4 : 2}
                stroke={mappingMemberColorCode(round.code)}
                label={
                  emphasizeMemberCode === round.code ? makeCustomizedLabel : ""
                }
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RoundChart;
