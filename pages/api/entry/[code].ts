import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { RaceData } from "../../../lib/typeDef";

export default async function handler(req: NextApiRequest, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db("holocup");
    const competitions = db.collection("competitions");
    const member = db.collection("member");
    const raceData = await competitions.find({}).toArray();
    const memeberData = await member.findOne({
      code: req.query.code,
    });

    const entryData: any[] = [];

    raceData.map((rounds) => {
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
              entryData.push({
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
                entryData.push({
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

    const result = {
      ...memeberData,
      entry: entryData,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
