"use client";

import { RoundDataType } from "@/utils/typeDef";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useSelectedCompetitionStore } from "./store";

const MemberFrame: NextPage<{
  title: string;
  memberCode: string;
  size?: number;
}> = ({ title, memberCode, size }) => {
  return (
    <div className="flex flex-col p-4 w-fit h-fit border-black border-2 relative group">
      <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 px-2 w-fit whitespace-nowrap font-semibold font-noto_kr">
        {title}
      </span>
      <Link href={"/member/" + memberCode}>
        <div className="flex justify-center cursor-pointer group-hover:scale-105">
          <Image
            src={`/entry/${memberCode}.png`}
            width={size ? size : 100}
            height={size ? size : 100}
            alt={memberCode}
          />
        </div>
      </Link>
    </div>
  );
};

const RecordSection: NextPage<{
  roundList: RoundDataType[];
}> = ({ roundList }) => {
  const selectedCup = useSelectedCompetitionStore(
    (state) => state.selectedCompetition
  );

  const CompetitionData = selectedCup
    ? roundList.filter((round) => round.cup_code === selectedCup.id)
    : [];

  const championship = CompetitionData.find(
    (round) => round.type === "championship"
  );
  const jakocup = CompetitionData.find((round) => round.type === "jakocup");

  const tryouts = CompetitionData.filter((round) => round.type === "tryout");

  return CompetitionData.length > 0 ? (
    <>
      <div className="flex gap-3 my-5 items-end">
        <MemberFrame
          title="우승"
          memberCode={championship!.details[0].code}
          size={200}
        />
        <MemberFrame
          title="준우승"
          memberCode={championship!.details[1].code}
        />
        <MemberFrame title="3위" memberCode={championship!.details[2].code} />
        <MemberFrame
          title="자코컵 우승"
          memberCode={jakocup!.details[0].code}
        />
        <MemberFrame
          title="자코컵 최하위"
          memberCode={jakocup!.details[jakocup!.details.length - 1].code}
        />
      </div>
      <div className="font-noto_kr font-semibold text-xl border-b border-black">
        참가 엔트리
      </div>
      <div>
        {tryouts.map((tryout) => {
          return (
            <div key={tryout.code} className="my-3">
              <div className="text-lg font-semibold">
                {`Block ` + tryout.block?.toUpperCase()}
              </div>
              <div className="flex my-3">
                {tryout.details.map((detail) => {
                  return (
                    <div key={detail.code}>
                      <MemberFrame
                        title={detail.rank + "위"}
                        memberCode={detail.code}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <></>
  );
};
export default RecordSection;
