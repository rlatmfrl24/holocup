import {
  calculateRankingPoint,
  filterMemberData,
  parseRoundCode,
} from "@/app/util";
import clientPromise from "@/utils/mongodb";
import { MemberType, RoundDataType, RoundDetailType } from "@/utils/typeDef";
import Image from "next/image";
import { useFloating } from "@floating-ui/react";
import BackButton from "./backButton";
import RaceChart from "./raceChart";
import RankingPoint from "./rankingPoint";

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

export default async function MemberPage({
  params,
}: {
  params: { code: string };
}) {
  const roundData = await getRoundListData();
  const memberData = await getMemberData();
  const member = memberData.find((member) => member.id === params.code);

  function colorCodeToRGBwithOpacity(
    colorCode: string,
    opacity: number
  ): string {
    const r = parseInt(colorCode.substring(1, 3), 16);
    const g = parseInt(colorCode.substring(3, 5), 16);
    const b = parseInt(colorCode.substring(5, 7), 16);

    return `rgb(${r}, ${g}, ${b}, ${opacity})`;
  }

  return (
    <div
      className="h-full bg-slate-200 p-3"
      style={{
        backgroundColor: member
          ? colorCodeToRGBwithOpacity(member?.color_secondary, 0.3)
          : colorCodeToRGBwithOpacity("#000000", 0.3),
      }}
    >
      <BackButton />

      <div className="flex gap-3">
        <div>
          <Image
            src={`/entry/` + params.code + `.png`}
            width={300}
            height={300}
            alt={params.code}
          />
        </div>
        <div className="flex flex-col flex-1 gap-3">
          <h1 className="font-noto_kr font-bold text-3xl">{member?.name_kr}</h1>
          <RankingPoint roundData={roundData} memberCode={params.code} />
          <h1 className="font-noto_kr font-semibold text-2xl border-b-2 border-black w-1/3">
            주요 대회 성적
          </h1>
          <div>
            {
              filterMemberData(roundData, params.code).map((round) => {
                return (
                  <div key={round.code} className="flex flex-col">
                    <h1 className="font-noto_kr text-base">
                      {parseRoundCode(round.code) +
                        " " +
                        round.details[0].rank +
                        "위"}
                    </h1>
                  </div>
                );
              })
              // JSON.stringify(filterMemberData(roundData, params.code))
            }
          </div>
        </div>
      </div>
      <div className="text-xl font-bold mt-8">대회 참가 기록</div>
      <div className="grid grid-cols-2 gap-3 mt-2">
        {filterMemberData(roundData, params.code).map(
          (round) => {
            return (
              <div
                key={round.code}
                className="flex flex-col bg-white p-3 shadow rounded gap-3"
              >
                <h1 className="font-noto_kr text-base font-semibold border-b border-gray-300">
                  {parseRoundCode(round.code)}
                </h1>
                <div className="grid grid-cols-[120px_1fr] font-noto_kr">
                  <div className="font-bold">최종 순위</div>
                  <div>{round.details[0].rank}위</div>
                  <div className="font-bold">획득 포인트</div>
                  <div>{round.details[0].point}점</div>
                </div>
                <RaceChart raceData={round.details[0]} member={member!} />
              </div>
            );
          }
          // JSON.stringify(filterMemberData(roundData, params.code))
        )}
      </div>
    </div>
  );
}
