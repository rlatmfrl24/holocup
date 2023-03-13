"use client";

import { CompetitionType, MemberType, RoundDataType } from "@/utils/typeDef";
import { NextPage } from "next";
import {
  avgRoundRankingPoint,
  mappingBlockType,
  mappingRoundType,
} from "../util";
import RoundChart from "./roundChart";
import { useRoundDataStore } from "./store";

const RoundData: NextPage<{
  cupData: CompetitionType[];
  roundListData: RoundDataType[];
  memberData: MemberType[];
}> = ({ cupData, memberData, roundListData }) => {
  const roundData = useRoundDataStore((state) => state.roundData);

  function makeRoundTitle() {
    let title;
    if (roundData && roundData.cup_code) {
      title = cupData.find((cup) => cup.id === roundData.cup_code)?.value;
      title += " ";
      title += mappingRoundType(roundData.type)?.value;
      if (roundData.block) {
        title += " ";
        title += mappingBlockType(roundData.block)?.value;
      }
    } else {
      title = "Select Round";
    }

    return title;
  }

  function getRoundWinner() {
    let winner;
    if (roundData && roundData.details) {
      const winnerData = roundData.details.find((detail) => detail.rank === 1);
      if (winnerData) {
        const winnerMember = memberData.find(
          (member) => member.id === winnerData.code
        );
        winner = winnerMember?.oshi_mark + " " + winnerMember?.name_kr;
      }
    }

    return winner;
  }

  return (
    <>
      {roundData && roundData.cup_code && roundData.details && memberData ? (
        <div>
          <h1 className="text-3xl font-bold font-noto_kr">
            {makeRoundTitle()}
          </h1>
          <p className="mt-3 flex flex-col">
            <span className="font-semibold font-poppins">Round Winner</span>
            <span className="text-2xl mb-4 font-noto_kr">
              {getRoundWinner()}
            </span>
            <span className="font-semibold font-poppins">
              Round Avg. Ranking Pts
            </span>
            <span className="text-2xl mb-4 font-noto_kr">
              {avgRoundRankingPoint(roundListData, roundData.members)}
            </span>
            <span className="font-semibold font-poppins">Race Results</span>
          </p>
          <RoundChart roundData={roundData.details} memberData={memberData} />
        </div>
      ) : (
        <div className="font-poppins flex items-center justify-center h-full text-3xl">
          Please Select Round
        </div>
      )}
    </>
  );
};

export default RoundData;
