"use client";

import { MemberType, RoundDetailType } from "@/utils/typeDef";
import { NextPage } from "next";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const RaceChart: NextPage<{
  raceData: RoundDetailType;
  member: MemberType;
}> = ({ raceData, member }) => {
  function makeChartData(data: number[]) {
    const result = data.map((value, index) => {
      return {
        id: "Race " + (index + 1),
        value: value > 0 ? value : 13,
      };
    });
    return result;
  }

  return (
    <div className="flex">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={makeChartData(raceData.race_results)}>
          <YAxis
            hide
            padding={{
              top: 20,
              bottom: 20,
            }}
            reversed
            domain={[0, 12]}
          />
          <XAxis
            padding={{
              left: 20,
              right: 20,
            }}
            tickFormatter={(tick) => {
              return `R${tick + 1}`;
            }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="value"
            stroke={member.color_primary}
            strokeWidth={2}
            label={(props: any) => {
              return (
                <text
                  x={props.x}
                  y={props.y}
                  dy={-8}
                  fill={member.color_primary}
                  fontSize={15}
                  fontWeight={600}
                  textAnchor="middle"
                >
                  {props.value !== 13 ? props.value + "위" : "실격"}
                </text>
              );
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RaceChart;
