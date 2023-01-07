import { GetServerSideProps, NextPage } from "next";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import Layout from "../components/layout";
import clientPromise from "../lib/mongodb";
import { MemberType, PredictionData } from "../lib/typeDef";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = await clientPromise;
  const db = client.db("holocup");
  const collection = db.collection("prediction");
  const member = db.collection("member");
  const prediction = await collection.find({}).toArray();
  const member_data = JSON.parse(
    JSON.stringify(await member.find({}).toArray())
  );
  const prediction_data = JSON.parse(JSON.stringify(prediction));

  return { props: { prediction_data, member_data } };
};

const Statistics: NextPage<{
  prediction_data: PredictionData[];
  member_data: MemberType[];
}> = ({ prediction_data, member_data }) => {
  function countValues(
    predictions: PredictionData[],
    field: keyof PredictionData
  ): { name: string; value: number }[] {
    const valueCounts: { [value: string]: number } = {};
    for (const prediction of predictions) {
      const value = prediction[field];
      if (typeof value !== "string") continue;
      if (!valueCounts[value]) {
        valueCounts[value] = 0;
      }
      valueCounts[value]++;
    }
    return Object.entries(valueCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }

  const winnerVotes = countValues(prediction_data, "winner");

  const PersonalBlock: NextPage<{
    data: { name: string; value: number }[];
    head: string;
  }> = ({ data, head }) => {
    return (
      <div className="flex-1 text-center p-3 border">
        <h2 className="font-bold">{head}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    member_data.find((member) => member.code === entry.name)
                      ?.color
                  }
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <Layout>
      <div className="flex flex-1 flex-col font-noto_kr">
        <h1 className="text-4xl font-bold">예측 현황</h1>
        <div className="flex-1 flex flex-col pt-5">
          <div className="flex flex-1 px-5 gap-3">
            <PersonalBlock data={winnerVotes} head={`우승자 예측`} />
            <PersonalBlock
              data={countValues(prediction_data, "runnerUp")}
              head={`2위 예측`}
            />
            <PersonalBlock
              data={countValues(prediction_data, "thirdPlace")}
              head={`3위 예측`}
            />
            <PersonalBlock
              data={countValues(prediction_data, "jako_winner")}
              head={`자코컵 우승자 예측`}
            />
            <PersonalBlock
              data={countValues(prediction_data, "jako")}
              head={`자코컵 최하위`}
            />
            {/* <PersonalBlock />
            <PersonalBlock />
            <PersonalBlock /> */}
          </div>

          <div className="flex-1"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Statistics;
