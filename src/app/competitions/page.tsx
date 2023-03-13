import clientPromise from "@/utils/mongodb";
import {
  CompetitionType,
  RoundDataType,
  RoundDetailType,
} from "@/utils/typeDef";
import CupSelector from "./cupSelector";
import RecordSection from "./record";

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

export default async function Competitions() {
  const cupList = await getCupListData();
  const roundData = await getRoundListData();

  return (
    <div className="bg-slate-200 px-5 py-4 flex-1 h-full font-poppins flex flex-col ">
      <CupSelector cupList={cupList} />
      <RecordSection roundList={roundData} />
    </div>
  );
}
