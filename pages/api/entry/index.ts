import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db("holocup");
    const collection = db.collection("entry_data");
    const data = await collection.find({}).toArray();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
}

// export type Member = {
//   id: string;
//   name_kr: string;
//   name_jp: string;
//   colorCode: string;
// };

// const MemberData: Member[] = [
//   {
//     id: "natsuiro_matsuri",
//     name_kr: "나츠이로 마츠리",
//     name_jp: "夏色まつり",
//     colorCode: "#FFB6C1",
//   },
//   {
//     id: "nekomata_okayu",
//     name_kr: "네코마타 오카유",
//     name_jp: "猫又おかゆ",
//     colorCode: "#FFB6C1",
//   },
//   {
//     id: "shirakami_fubuki",
//     name_kr: "시라카미 후부키",
//     name_jp: "白上フブキ",
//     colorCode: "#FFB6C1",
//   },
// ];

// const getMemberData = (id: string) => {
//   return MemberData.find((member) => member.id === id);
// };

// export { getMemberData };
