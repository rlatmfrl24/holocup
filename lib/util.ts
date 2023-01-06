import { group_a, group_b } from "./store";

function sortByDuplicates(
  list1: string[],
  list2: string[]
): [string[], string[]] {
  const counts: { [key: string]: number } = {};
  for (const element of [...list1, ...list2])
    counts[element] = (counts[element] || 0) + 1;
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return [
    [...list1].sort(
      (a, b) =>
        sorted.findIndex(([x]) => x === a) - sorted.findIndex(([x]) => x === b)
    ),
    [...list2].sort(
      (a, b) =>
        sorted.findIndex(([x]) => x === a) - sorted.findIndex(([x]) => x === b)
    ),
  ];
}

const getDummyResult = () => {
  return {
    nickname: "dummy",
    password: "dummy",
    championshipPrediction: group_a,
    jakoPrediction: group_b,
    winner: "tokoyami_towa",
    runnerUp: "watson_amelia",
    thirdPlace: "gawr_gura",
    jako_winner: "hakui_koyori",
    jako: "tsunomaki_watame",
    createTimestamp: new Date(),
    modifyTimestamp: new Date(),
  };
};

export { sortByDuplicates, getDummyResult };
