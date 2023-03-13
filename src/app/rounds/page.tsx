import clientPromise from "@/utils/mongodb";
import {
  CompetitionType,
  MemberType,
  RoundDataType,
  RoundDetailType,
} from "@/utils/typeDef";
import RoundData from "./roundData";
import RoundRank from "./roundRank";
import RoundSelector from "./roundSelector";

async function getCupListData(): Promise<CompetitionType[]> {
  const client = await clientPromise;
  const db = client.db("holocup_next");
  const cupInfo = db.collection("cup_info");
  const cupListData = await cupInfo.find({}).toArray();
  const cupList = cupListData.map((cup) => {
    return {
      id: cup.code,
      value: cup.name.kr,
    };
  });

  return cupList;
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

const RoundDB = async () => {
  const cupList = await getCupListData();
  const roundData = await getRoundListData();
  const memberData = await getMemberData();

  return (
    <div className="bg-slate-200 w-full h-full px-5 py-4 flex flex-col gap-3">
      <div className="flex gap-8 items-end">
        <h1 className="text-2xl font-bold font-poppins">Round DB</h1>
        <RoundSelector cupList={cupList} roundData={roundData} />
      </div>
      <div className="flex flex-1 gap-3">
        <div className="flex-1 bg-white shadow p-3 rounded">
          <RoundData
            cupData={cupList}
            roundListData={roundData}
            memberData={memberData}
          />
        </div>
        <RoundRank memberData={memberData} />
      </div>
    </div>
  );
};

export default RoundDB;
