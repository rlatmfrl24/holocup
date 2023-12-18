"use client";

import { MemberType, RoundDataType } from "@/utils/typeDef";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useEmphasizeMemberCodeStore, useRoundDataStore } from "./store";

function makeRankBoardList(roundData: RoundDataType, memberData: MemberType[]) {
  const rankBoardList = roundData.details?.map((detail) => {
    const member = memberData.find((member) => member.id === detail.code)!;
    if (member === undefined) {
      console.log(detail.code);
    }
    return {
      rank: detail.rank,
      name: detail.code,
      point: detail.point,
      data: member,
      race_data: roundData.details?.find((detail) => detail.code === member?.id)
        ?.race_results,
    };
  });

  return rankBoardList;
}

const RoundRank: NextPage<{ memberData: MemberType[] }> = ({ memberData }) => {
  const roundData = useRoundDataStore((state) => state.roundData);
  const setEmphasizeMember = useEmphasizeMemberCodeStore(
    (state) => state.setEmphasizeMemberCode
  );
  const [rankBoardList, setRankBoardList] = useState<
    { rank: number; name: string; point: number; data: any; race_data: any }[]
  >([]);

  useEffect(() => {
    if (roundData) {
      setRankBoardList(makeRankBoardList(roundData, memberData));
    }
  }, [memberData, roundData]);

  function changeCodeToName(code: string) {
    let name = code.replaceAll("_", " ");

    // then capitalize first letter of each word
    name = name
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");

    return name;
  }

  return (
    <div className="shadow px-5 py-3 bg-white rounded w-1/3">
      <h2
        className="font-poppins text-lg font-medium cursor-pointer "
        onClick={() => {
          // make csv with tab from rankBoardList
          const csv_data = rankBoardList?.map((rankBoard) => {
            return (
              rankBoard.name + "\t" + rankBoard.race_data?.join("\t") + "\n"
            );
          });
          navigator.clipboard.writeText(csv_data?.join("") ?? "");
        }}
      >
        Round Result
      </h2>
      <ul>
        <li className="flex items-center gap-3 font-noto_kr py-2 border-b text-xs">
          <span className="w-8 text-center">Rank</span>
          <span className="flex-1 text-center">Name</span>
          <span className="ml-10 font-bold">Point</span>
        </li>
        {rankBoardList?.map((rankBoard, index) => (
          <li
            key={rankBoard.name}
            className="flex items-center gap-3 font-noto_kr py-2 border-b hover:bg-gray-100 hover:cursor-pointer"
            onMouseEnter={() => {
              setEmphasizeMember(rankBoard.name);
            }}
            onMouseLeave={() => {
              setEmphasizeMember("");
            }}
            onClick={() => {
              navigator.clipboard.writeText(
                rankBoard.race_data?.join("\t") ?? ""
              );
            }}
          >
            <span className="w-8 text-center">{rankBoard.rank}</span>
            <span className={`flex-1 font-semibold`}>{`${
              rankBoard.data.oshi_mark
            } ${rankBoard.data.name_kr} (${changeCodeToName(
              rankBoard.name
            )})`}</span>
            <span className="ml-10 font-bold ">{rankBoard.point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoundRank;
