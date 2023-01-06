import { useRecoilValue } from "recoil";
import Layout from "../../components/layout";
import { group_a, group_b, group_c, newPredictionState } from "../../lib/store";
import Image from "next/image";
import { NextPage } from "next";
import { getDummyResult, sortByDuplicates } from "../../lib/util";
import { useState } from "react";
import { PredictionData } from "../../lib/typeDef";

const PredictionResult = () => {
  const predictionData = useRecoilValue(newPredictionState);
  const [totalScore, setTotalScore] = useState(0);

  //   const [totalScore, setTotalScore] = useState(
  //     calulateScore(predictionData, resultData)
  //   );

  function calulateScore(prediction: PredictionData, result: PredictionData) {
    let score = 0;

    if (prediction.winner === result.winner) {
      score += 10;
    }
    if (prediction.runnerUp === result.runnerUp) {
      score += 5;
    }
    if (prediction.thirdPlace === result.thirdPlace) {
      score += 3;
    }
    if (prediction.jako_winner === result.jako_winner) {
      score += 7;
    }
    if (prediction.jako === result.jako) {
      score += 3;
    }

    prediction.championshipPrediction.forEach((prediction) => {
      result.championshipPrediction.forEach((result) => {
        if (prediction === result) {
          score += 2;
        }
      });
    });

    prediction.jakoPrediction.forEach((prediction) => {
      result.jakoPrediction.forEach((result) => {
        if (prediction === result) {
          score += 1;
        }
      });
    });

    return score;
  }

  const PredictionBox: NextPage<{
    head: string;
    prediction: string;
    result?: string;
    score: number;
  }> = ({ head, prediction, result, score }) => {
    return (
      <div className="flex flex-col flex-1 p-3 border-2 border-black m-3 items-center">
        <span className="-translate-y-5 h-2 px-2 bg-white w-fit text-xl font-bold flex items-center">
          {head}
          <span className="text-red-500 text-xl"> ({score}점)</span>
        </span>
        <div className="flex-1 w-full flex gap-3">
          <div className="w-full flex-1 text-center">
            <span className="font-bold">나의 예측</span>
            <Image
              src={`/images/entry/${prediction}.png`}
              width={200}
              height={200}
              alt="winner"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="w-full flex-1 text-center flex flex-col">
            <span className="font-bold">실제 결과</span>
            {result !== undefined ? (
              <Image
                src={`/images/entry/${result}.png`}
                width={200}
                height={200}
                alt="winner"
                style={{ objectFit: "contain" }}
                className="flex-1"
              />
            ) : (
              <div className="bg-gray-400 flex-1 flex items-center justify-center text-4xl font-bold rounded">
                ?
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const PredictionGroupBox: NextPage<{
    head: string;
    prediction: string[];
    result?: string[];
    score: number;
  }> = ({ head, score, prediction, result }) => {
    let sorted = [];
    if (result !== undefined) {
      sorted = sortByDuplicates(prediction, result);
    } else {
      sorted[0] = prediction;
    }

    return (
      <div className="flex flex-col flex-1 p-3 border-2 border-black m-3 items-center">
        <span className="-translate-y-5 h-2 px-2 bg-white w-fit text-xl font-bold flex items-center">
          {head}
          <span className="text-red-500 text-xl"> (1명당 {score}점)</span>
        </span>
        <div className="flex flex-col mb-3">
          <span className="font-bold">나의 예측</span>
          <div className="flex flex-1 gap-3 relative">
            {sorted[0].map((team) => (
              <div key={team} className="flex-1">
                <Image
                  src={`/images/entry/${team}.png`}
                  width={100}
                  height={100}
                  alt="winner"
                  style={{ objectFit: "contain" }}
                  className="flex-1"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <span className="font-bold">실제 결과</span>
          <div className="flex flex-1 gap-3 relative">
            {
              // result가 undefined일 경우에는 ?를 출력
              result === undefined
                ? [...Array(12)].map((i) => (
                    <div key={i} className="flex-1">
                      <div className="bg-gray-400 h-20 flex-1 flex items-center justify-center text-4xl font-bold rounded">
                        ?
                      </div>
                    </div>
                  ))
                : sorted[1].map((team) => (
                    <div key={team} className="flex-1">
                      <Image
                        src={`/images/entry/${team}.png`}
                        width={100}
                        height={100}
                        alt="winner"
                        style={{ objectFit: "contain" }}
                        className="flex-1"
                      />
                    </div>
                  ))
            }
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="p-3 font-noto_kr flex-1 flex-col flex">
        <span className="text-4xl font-bold">예측 결과</span>
        <span className="text-2xl font-bold mt-5 ml-2 flex flex-col">
          <span>닉네임: {predictionData.nickname}</span>
          <span>나의 점수: {totalScore}</span>
          <span>예측한 시간: {predictionData.createTimestamp.toString()}</span>
        </span>
        <div className="flex-1 flex flex-col mt-5">
          <div className="h-fit flex">
            <PredictionBox
              head="우승자"
              prediction={predictionData.winner}
              score={10}
            />
            <PredictionBox
              head="2위"
              prediction={predictionData.runnerUp}
              score={5}
            />
            <PredictionBox
              head="3위"
              prediction={predictionData.thirdPlace}
              score={3}
            />
            <PredictionBox
              head="자코컵 우승"
              prediction={predictionData.jako_winner}
              score={7}
            />
            <PredictionBox
              head="자코컵 최하위"
              prediction={predictionData.jako}
              score={4}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <PredictionGroupBox
              head="챔피언쉽"
              prediction={predictionData.championshipPrediction}
              score={2}
            />
            <PredictionGroupBox
              head="자코컵"
              prediction={predictionData.jakoPrediction}
              score={1}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PredictionResult;
