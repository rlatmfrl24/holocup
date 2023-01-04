import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db("holocup");
    const collection = db.collection("entry_data");
    const data = await collection.findOne({
      code: req.query.code,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
}
