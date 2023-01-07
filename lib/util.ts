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
    championshipPrediction: [
      "houshou_marine",
      "hosimachi_suisei",
      "ookami_mio",
      "nekomata_okayu",
      "kazama_iroha",
      "oozora_subaru",
      "takane_rui",
      "sakura_miko",
      "hakui_koyori",
      "natsuiro_matsuri",
      "shirakami_fubuki",
      "nakiri_ayame",
    ],
    jakoPrediction: [
      "ouro_kronii",
      "momosuzu_nene",
      "shirogane_noel",
      "yozora_mel",
      "roboco",
      "kaela_kovalskia",
      "watson_amelia",
      "tokino_sora",
      "anya_melfissa",
      "vestia_zeta",
      "kobo_kanaeru",
      "yuzuki_choco",
    ],
    winner: "hosimachi_suisei",
    runnerUp: "houshou_marine",
    thirdPlace: "ookami_mio",
    jako_winner: "ouro_kronii",
    jako: "yuzuki_choco",
    createTimestamp: new Date(),
    modifyTimestamp: new Date(),
  };
};

export { sortByDuplicates, getDummyResult };
