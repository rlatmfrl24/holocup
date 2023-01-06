import next, { NextPage } from "next";
import Layout from "../../components/layout";
import { group_a, group_b, group_c, newPredictionState } from "../../lib/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import Link from "next/link";

const PredictionPage: NextPage = () => {
  const [predictionData, setPredictionData] =
    useRecoilState(newPredictionState);

  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const [GroupChampPrediction, setGroupChampPrediction] = useState<{
    [key: string]: string[];
  }>({
    group_a: [],
    group_b: [],
    group_c: [],
  });

  const [GroupJakoPrediction, setGroupJakoPrediction] = useState<{
    [key: string]: string[];
  }>({
    group_a: [],
    group_b: [],
    group_c: [],
  });

  const [finalPrediction, setFinalPrediction] = useState<{
    [key: string]: string;
  }>({
    champion: "",
    runnerup: "",
    third: "",
    jako_winner: "",
    jako: "",
  });

  useEffect(() => {
    if (currentPage === 3) {
      setPredictionData({
        ...predictionData,
        championshipPrediction: [
          GroupChampPrediction.group_a,
          GroupChampPrediction.group_b,
          GroupChampPrediction.group_c,
        ].flat(),
        jakoPrediction: [
          GroupJakoPrediction.group_a,
          GroupJakoPrediction.group_b,
          GroupJakoPrediction.group_c,
        ].flat(),
        jako: finalPrediction.jako,
        jako_winner: finalPrediction.jako_winner,
        thirdPlace: finalPrediction.third,
        runnerUp: finalPrediction.runnerup,
        winner: finalPrediction.champion,
      });
    }
  }, [GroupChampPrediction, GroupJakoPrediction, finalPrediction]);

  function nextPage(doSomething: Function) {
    if (doSomething()) {
      setCurrentPage(currentPage + 1);
    }
  }
  function prevPage(doSomething: Function) {
    if (doSomething()) {
      setCurrentPage(currentPage - 1);
    }
  }
  function getPage(currentPage: number) {
    switch (currentPage) {
      case 0:
        return <GroupChampPredictionPage />;
      case 1:
        return <GroupJakoPredictionPage />;
      case 2:
        return <ChampionShipPredictionPage />;
      case 3:
        return <JakoRoundPredictionPage />;
      case 4:
        return <PredictionCompletePage />;
      default:
        break;
    }
  }

  function validateChampPrediction() {
    const { group_a, group_b, group_c } = GroupChampPrediction;
    if (group_a.length !== 4 || group_b.length !== 4 || group_c.length !== 4) {
      return false;
    }
    return true;
  }

  function validateJakoPrediction() {
    const { group_a, group_b, group_c } = GroupJakoPrediction;
    if (group_a.length !== 4 || group_b.length !== 4 || group_c.length !== 4) {
      return false;
    }
    return true;
  }

  const PrevPageButton: NextPage<{ doSomething: Function }> = ({
    doSomething,
  }) => {
    return (
      <button
        className="h-fit ml-2 text-xl bg-third-400 text-white py-2 px-3 rounded"
        onClick={() => prevPage(doSomething)}
      >
        이전
      </button>
    );
  };

  const NextPageButton: NextPage<{ doSomething: Function }> = ({
    doSomething,
  }) => {
    return (
      <button
        className="h-fit mr-2 text-xl bg-third-400 text-white py-2 px-3 rounded"
        onClick={() => nextPage(doSomething)}
      >
        다음
      </button>
    );
  };

  const GroupBoxForChamp: NextPage<{
    groupName: string;
    groupEntry: string[];
  }> = ({ groupName, groupEntry }) => {
    const groupCode: string = groupName.toLowerCase().replace(" ", "_");

    return (
      <div
        aria-label="group_a"
        className="p-3 rounded shadow flex flex-col flex-1"
      >
        <span className="font-bold text-3xl font-poppins mb-3">
          {groupName}
          <span className="ml-4 text-2xl">
            ({GroupChampPrediction[groupCode].length.toString()}/4)
          </span>
        </span>
        <div className="flex gap-6">
          {groupEntry.map((member) => (
            <div
              key={member}
              className={`cursor-pointer ${
                GroupChampPrediction[groupCode].includes(member)
                  ? "border-4 border-black rounded-lg scale-125"
                  : ""
              } }`}
              onClick={() => {
                if (GroupChampPrediction[groupCode].includes(member)) {
                  setGroupChampPrediction({
                    ...GroupChampPrediction,
                    [groupCode]: GroupChampPrediction[groupCode].filter(
                      (item) => item !== member
                    ),
                  });
                } else {
                  if (GroupChampPrediction[groupCode].length >= 4) {
                    return;
                  }

                  setGroupChampPrediction({
                    ...GroupChampPrediction,
                    [groupCode]: [...GroupChampPrediction[groupCode], member],
                  });
                }
              }}
            >
              <Image
                src={`/images/entry/${member}.png`}
                alt="avatar"
                width={120}
                height={120}
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const GroupBoxForJako: NextPage<{
    groupName: string;
    groupEntry: string[];
  }> = ({ groupName, groupEntry }) => {
    const groupCode: string = groupName.toLowerCase().replace(" ", "_");

    return (
      <div
        aria-label="group_a"
        className="p-3 rounded shadow flex flex-col flex-1"
      >
        <span className="font-bold text-3xl font-poppins mb-3">
          {groupName}
          <span className="ml-4 text-2xl">
            ({GroupJakoPrediction[groupCode].length.toString()}/4)
          </span>
        </span>
        <div className="flex gap-6">
          {groupEntry.map((member) => (
            <div
              key={member}
              className={`cursor-pointer ${
                GroupJakoPrediction[groupCode].includes(member)
                  ? "border-4 border-black rounded-lg scale-125 "
                  : ""
              } ${
                GroupChampPrediction[groupCode].includes(member)
                  ? "grayscale cursor-not-allowed"
                  : ""
              }`}
              onClick={() => {
                if (GroupChampPrediction[groupCode].includes(member)) {
                  return;
                } else {
                  if (GroupJakoPrediction[groupCode].includes(member)) {
                    setGroupJakoPrediction({
                      ...GroupJakoPrediction,
                      [groupCode]: GroupJakoPrediction[groupCode].filter(
                        (item) => item !== member
                      ),
                    });
                  } else {
                    if (GroupJakoPrediction[groupCode].length >= 4) {
                      return;
                    }

                    setGroupJakoPrediction({
                      ...GroupJakoPrediction,
                      [groupCode]: [...GroupJakoPrediction[groupCode], member],
                    });
                  }
                }
              }}
            >
              <Image
                src={`/images/entry/${member}.png`}
                alt="avatar"
                width={120}
                height={120}
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const GroupChampPredictionPage: NextPage = () => {
    function valiate(): boolean {
      if (!validateChampPrediction()) {
        alert("챔피언쉽 진출 예측을 완료해주세요. (그룹당 4명)");
        return false;
      }
      return true;
    }

    return (
      <div className="p-3 flex flex-col font-noto_kr">
        <div className="font-bold text-center flex items-center my-4">
          <div className="text-3xl flex-1">
            그룹별 챔피언쉽 진출자를 선택해주세요
          </div>

          <NextPageButton doSomething={valiate} />
        </div>

        <div className="flex flex-col flex-1">
          <GroupBoxForChamp groupName="Group A" groupEntry={group_a} />
          <GroupBoxForChamp groupName="Group B" groupEntry={group_b} />
          <GroupBoxForChamp groupName="Group C" groupEntry={group_c} />
        </div>
      </div>
    );
  };

  const GroupJakoPredictionPage: NextPage = () => {
    return (
      <div className="p-3 flex flex-col font-noto_kr">
        <div className="font-bold text-center flex items-center my-4">
          <PrevPageButton
            doSomething={() => {
              if (
                confirm(
                  "이전 페이지로 돌아가면 자코컵 예측이 초기화됩니다. 계속하시겠습니까?"
                )
              ) {
                setGroupJakoPrediction({
                  group_a: [],
                  group_b: [],
                  group_c: [],
                });
                return true;
              } else {
                return false;
              }
            }}
          />

          <div className="text-3xl flex-1">
            그룹별 자코컵 진출자를 선택해주세요
          </div>

          <NextPageButton
            doSomething={() => {
              if (!validateJakoPrediction()) {
                alert("자코컵 진출 예측을 완료해주세요. (그룹당 4명)");
                return false;
              }
              return true;
            }}
          />
        </div>

        <div className="flex flex-col flex-1">
          <GroupBoxForJako groupName="Group A" groupEntry={group_a} />
          <GroupBoxForJako groupName="Group B" groupEntry={group_b} />
          <GroupBoxForJako groupName="Group C" groupEntry={group_c} />
        </div>
      </div>
    );
  };

  const ChampionShipPredictionPage: NextPage = () => {
    const championshipEntry = [
      GroupChampPrediction.group_a,
      GroupChampPrediction.group_b,
      GroupChampPrediction.group_c,
    ].flat();

    const [currentStep, setCurrentStep] = useState(0);
    const [winner, setWinner] = useState("");
    const [second, setSecond] = useState("");
    const [third, setThird] = useState("");

    const stepSentence = [
      "챔피언쉽 우승자를 예측해주세요",
      "챔피언쉽 2위를 예측해주세요",
      "챔피언쉽 3위를 예측해주세요",
      "다시 예측하려면 초기화, 제출하려면 다음 버튼을 눌러주세요",
    ];

    const selectionHandler = (member: string) => {
      if (currentStep === 0) {
        setWinner(member);
        setCurrentStep(1);
      } else if (currentStep === 1) {
        if (member === winner) {
          return;
        }
        setSecond(member);
        setCurrentStep(2);
      } else if (currentStep === 2) {
        if (member === winner || member === second) {
          return;
        }
        setThird(member);
        setCurrentStep(3);
      } else {
        return;
      }
    };

    return (
      <div className="p-1 flex flex-col font-noto_kr w-full">
        <div className="font-bold text-center flex items-center my-4">
          <PrevPageButton
            doSomething={() => {
              return true;
            }}
          />

          <div className="text-3xl flex-1">
            챔피언쉽 예측
            <p className="text-xl">{stepSentence[currentStep]}</p>
          </div>

          <NextPageButton
            doSomething={() => {
              if (winner === "" || second === "" || third === "") {
                alert("챔피언쉽 예측을 완료해주세요.");
                return false;
              }
              setFinalPrediction({
                champion: winner,
                runnerup: second,
                third: third,
              });
              return true;
            }}
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="p-3 flex flex-col">
            <div className="flex gap-6">
              {championshipEntry.map((member) => (
                <div
                  key={member}
                  className={`${
                    member === winner || member === second || member === third
                      ? "cursor-not-allowed grayscale"
                      : "cursor-pointer"
                  } `}
                  onClick={() => selectionHandler(member)}
                >
                  <Image
                    src={`/images/entry/${member}.png`}
                    alt="avatar"
                    width={120}
                    height={120}
                    style={{ objectFit: "contain", minWidth: "4rem" }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 items-center flex flex-col gap-3 font-noto_kr mt-3">
            <div className="h-48 w-48 rounded border-2 flex flex-col items-center">
              <span className="h-3 text-xl font-bold -translate-y-3 bg-white px-5">
                우승자
              </span>
              <div className="flex-1 w-full p-3 flex">
                <div className="bg-slate-100 w-full relative">
                  {winner === "" ? (
                    <></>
                  ) : (
                    <Image
                      src={`/images/entry/${winner}.png`}
                      alt="avatar"
                      fill
                      style={{ objectFit: "contain", minWidth: "4rem" }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-32 h-32 border flex flex-col items-center">
                <span className="h-3 text-xl font-bold -translate-y-3 bg-white px-5">
                  2등
                </span>
                <div className="flex-1 w-full p-3 flex">
                  <div className="bg-slate-100 w-full relative">
                    {second === "" ? (
                      <></>
                    ) : (
                      <Image
                        src={`/images/entry/${second}.png`}
                        alt="avatar"
                        fill
                        style={{ objectFit: "contain", minWidth: "4rem" }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="w-32 h-32 border flex flex-col items-center">
                <span className="h-3 text-xl font-bold -translate-y-3 bg-white px-5">
                  3등
                </span>
                <div className="flex-1 w-full p-3 flex">
                  <div className="bg-slate-100 w-full relative">
                    {third === "" ? (
                      <></>
                    ) : (
                      <Image
                        src={`/images/entry/${third}.png`}
                        alt="avatar"
                        fill
                        style={{ objectFit: "contain", minWidth: "4rem" }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button
              className="
              bg-slate-100
              text-slate-500
              font-bold
              py-2
              px-4
              rounded
              border-2
              border-slate-500
              hover:bg-slate-200
              hover:text-slate-600
              focus:outline-none
              focus:shadow-outline 
            "
              type="button"
              onClick={() => {
                setWinner("");
                setSecond("");
                setThird("");
                setCurrentStep(0);
              }}
            >
              초기화
            </button>
          </div>
        </div>
      </div>
    );
  };

  const JakoRoundPredictionPage: NextPage = () => {
    const jakoRoundEntry = [
      GroupJakoPrediction.group_a,
      GroupJakoPrediction.group_b,
      GroupJakoPrediction.group_c,
    ].flat();

    const [currentStep, setCurrentStep] = useState(0);
    const [winner, setWinner] = useState("");
    const [jako, setJako] = useState("");

    const stepSentence = [
      "자코컵 우승자를 예측해주세요",
      "자코컵 최하위를 예측해주세요",
      "다시 예측하려면 초기화, 제출하려면 다음 버튼을 눌러주세요",
    ];

    const selectionHandler = (member: string) => {
      if (currentStep === 0) {
        setWinner(member);
        setCurrentStep(1);
      } else if (currentStep === 1) {
        if (member === winner) {
          return;
        }
        setJako(member);
      }
    };

    return (
      <div className="p-1 flex flex-col font-noto_kr w-full">
        <div className="font-bold text-center flex items-center my-4">
          <PrevPageButton
            doSomething={() => {
              return true;
            }}
          />

          <div className="text-3xl flex-1">
            자코컵 예측
            <p className="text-xl">{stepSentence[currentStep]}</p>
          </div>

          <NextPageButton
            doSomething={async () => {
              if (winner === "" || jako === "") {
                alert("자코컵 예측을 완료해주세요.");
                return false;
              } else {
                if (
                  confirm(
                    "제출하시겠습니까? 이후의 수정은 가능하지만 수정시 불이익이 생길 수 있습니다."
                  )
                ) {
                  setFinalPrediction({
                    jako_winner: winner,
                    jako: jako,
                  });

                  const reqBody = JSON.stringify({
                    ...predictionData,
                    jako_winner: winner,
                    jako: jako,
                  });
                  console.log(reqBody);

                  await fetch("/api/prediction", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      ...predictionData,
                      jako_winner: winner,
                      jako: jako,
                    }),
                  });

                  return true;
                }
              }

              return true;
            }}
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="p-3 flex flex-col">
            <div className="flex gap-6">
              {jakoRoundEntry.map((member) => (
                <div
                  key={member}
                  className={`${
                    member === winner || member === jako
                      ? "cursor-not-allowed grayscale"
                      : "cursor-pointer"
                  } `}
                  onClick={() => selectionHandler(member)}
                >
                  <Image
                    src={`/images/entry/${member}.png`}
                    alt="avatar"
                    width={120}
                    height={120}
                    style={{ objectFit: "contain", minWidth: "4rem" }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 items-center justify-center flex flex-col gap-3 font-noto_kr mt-3">
            <div className="flex gap-3">
              <div className="w-48 h-48 border flex flex-col items-center">
                <span className="h-3 text-xl font-bold -translate-y-3 bg-white px-5">
                  우승자
                </span>
                <div className="flex-1 w-full p-3 flex">
                  <div className="bg-slate-100 w-full relative">
                    {winner === "" ? (
                      <></>
                    ) : (
                      <Image
                        src={`/images/entry/${winner}.png`}
                        alt="avatar"
                        fill
                        style={{ objectFit: "contain", minWidth: "4rem" }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="w-48 h-48 border flex flex-col items-center">
                <span className="h-3 text-xl font-bold -translate-y-3 bg-white px-5">
                  최하위
                </span>
                <div className="flex-1 w-full p-3 flex">
                  <div className="bg-slate-100 w-full relative">
                    {jako === "" ? (
                      <></>
                    ) : (
                      <Image
                        src={`/images/entry/${jako}.png`}
                        alt="avatar"
                        fill
                        style={{ objectFit: "contain", minWidth: "4rem" }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button
              className="
              bg-slate-100
              text-slate-500
              font-bold
              py-2
              px-4
              rounded
              border-2
              border-slate-500
              hover:bg-slate-200
              hover:text-slate-600
              focus:outline-none
              focus:shadow-outline 
            "
              type="button"
              onClick={() => {
                setWinner("");
                setJako("");
                setCurrentStep(0);
              }}
            >
              초기화
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PredictionCompletePage: NextPage = () => {
    return (
      <div className="flex-1 flex flex-col font-noto_kr text-2xl">
        <p>예측 완료!</p>
        <p>로그인하셔서 예측 결과를 확인해보세요!</p>
        <Link href="/login">
          <button
            className="              
            bg-slate-100
              text-slate-500
              font-bold
              py-2
              px-4
              rounded
              border-2
              border-slate-500
              hover:bg-slate-200
              hover:text-slate-600
              focus:outline-none
              focus:shadow-outline 
          "
          >
            로그인 페이지로 이동
          </button>
        </Link>
      </div>
    );
  };

  return <Layout>{getPage(currentPage)}</Layout>;
};

export default PredictionPage;
