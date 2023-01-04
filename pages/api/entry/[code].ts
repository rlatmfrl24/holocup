import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

type RaceData = {
  code: string;
  name_kr: string;
  rank: number;
  point: number;
  race_results: number[];
};

export default async function handler(req: NextApiRequest, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db("holocup");
    const collection = db.collection("competitions");
    const data = await collection.find({}).toArray();

    const result: any[] = [];

    data.map((rounds) => {
      let round_data = {
        cup_code: rounds.code,
        cup_name: rounds.name,
      };

      const round_map = new Map(Object.entries(rounds.rounds));

      round_map.forEach((value, key) => {
        if (key !== "pre_round") {
          const raceDataList = value as RaceData[];
          raceDataList.map((raceData) => {
            if (raceData.code === req.query.code) {
              result.push({
                race_code: key,
                ...round_data,
                ...raceData,
              });
            }
          });
        } else {
          const preRaces = value;
          const preRaceMap = new Map(
            Object.entries(Object.assign({}, preRaces))
          );

          preRaceMap.forEach((value, key) => {
            const raceDataList = value as RaceData[];
            raceDataList.map((raceData) => {
              if (raceData.code === req.query.code) {
                result.push({
                  race_code: "pre_round_" + key,
                  ...round_data,
                  ...raceData,
                });
              }
            });
          });
        }
      });
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
