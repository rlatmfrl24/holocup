import clientPromise from "@/utils/mongodb";
import { MemberType, RoundDataType, RoundDetailType } from "@/utils/typeDef";
import Link from "next/link";
import Image from "next/image";
import {
  calculateRankingPoint,
  colorCodeToRGBwithOpacity,
  filterMemberData,
} from "../util";
import LeaderboardTooltip from "./tooltip";

async function getMemberData(): Promise<MemberType[]> {
  const client = await clientPromise;
  const db = client.db("holocup_next");
  const memberData = db.collection("members");
  const memberListData = await memberData.find({}).toArray();
  const memberList = memberListData.map((member) => {
    return {
      id: member.id,
      name_kr: member.name_kr,
      belong: member.belong,
      belong_name: member.belong_name,
      color_primary: member.color_primary,
      color_secondary: member.color_secondary,
      color_third: member.color_third,
      oshi_mark: member.oshi_mark,
    };
  });

  return memberList;
}

async function getRoundListData(): Promise<RoundDataType[]> {
  const client = await clientPromise;
  const db = client.db("holocup_next");
  const roundData = db.collection("rounds");
  const roundListData = await roundData.find({}).toArray();
  const roundList: RoundDataType[] = roundListData.map((round) => {
    const details: RoundDetailType[] = round.details.map((data: any) => {
      return {
        code: data.code,
        rank: data.rank,
        point: data.point,
        race_results: data.race_results,
      };
    });

    return {
      code: round.code,
      cup_code: round.cup_code,
      type: round.type,
      block: round.block,
      members: round.members,
      details: details,
    };
  });
  return roundList;
}

const Members = async () => {
  const roundData = await getRoundListData();
  const memberData = await getMemberData();

  const membersRankingPointList = memberData.map((member) => {
    return {
      id: member.id,
      point: calculateRankingPoint(filterMemberData(roundData, member.id)),
    };
  });

  const sortedMembersRankingPointList = membersRankingPointList
    .sort((a, b) => b.point - a.point)
    .filter((member) => member.point > 0);

  return (
    <div className="h-full bg-slate-200 p-3">
      <h1 className="font-poppins text-2xl font-bold p-2 flex items-center gap-2">
        Leaderboard
        <LeaderboardTooltip />
      </h1>
      <div className="grid grid-rows-[repeat(12,_minmax(0,_1fr))] grid-flow-col gap-1 mt-4">
        {sortedMembersRankingPointList.map((memberRankData, index) => {
          const member = memberData.find(
            (member) => member.id === memberRankData.id
          );

          return (
            <Link key={index} href={`/member/` + member?.id}>
              <div
                className="flex mx-3 pl-1 pr-3 py-1 items-center hover:font-bold hover:cursor-pointer group"
                style={{
                  backgroundColor: member
                    ? colorCodeToRGBwithOpacity(member.color_primary, 0.2)
                    : "transparent",
                }}
              >
                <span className="w-6 text-center font-semibold">
                  {index + 1}
                </span>
                <span className="flex-1 font-noto_kr ">
                  {member?.oshi_mark + " "}
                  <span className="group-hover:underline">
                    {member?.name_kr}
                  </span>
                </span>
                <span className="font-poppins font-medium text-sm">
                  {memberRankData.point}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Members;
