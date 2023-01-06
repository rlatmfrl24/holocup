import { NextApiRequest } from "next";
import clientPromise from "../../lib/mongodb";
import { PredictionData } from "../../lib/typeDef";

export default async function handler(req: NextApiRequest, res: any) {
  try {
    if (req.method === "POST") {
      const client = await clientPromise;
      const db = client.db("holocup");
      const predictionCollection = db.collection("prediction");
      const requestBody: PredictionData = {
        ...req.body,
        createTimestamp: new Date(),
        modifyTimestamp: new Date(),
      };
      const result = await predictionCollection.insertOne(requestBody);
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
  }
}
