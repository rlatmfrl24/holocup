import { NextApiRequest } from "next";
import clientPromise from "../../lib/mongodb";
import { LOGIN_STATUS } from "../../lib/typeDef";

export default async function handler(req: NextApiRequest, res: any) {
  try {
    if (req.method === "POST") {
      const client = await clientPromise;
      const db = client.db("holocup");
      const predictionCollection = db.collection("prediction");
      const requestBody = req.body;

      const result = await predictionCollection.findOne({
        nickname: requestBody.nickname,
      });

      if (!result) {
        res.status(200).json({ message: LOGIN_STATUS.NO_USER });
      }
      if (result && result.password === requestBody.password) {
        res.status(200).json({ message: LOGIN_STATUS.SUCCESS, data: result });
      } else {
        res.status(200).json({ message: LOGIN_STATUS.PWD_ERROR });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
