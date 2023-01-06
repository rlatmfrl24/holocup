import { atom } from "recoil";
import { PredictionData } from "./typeDef";

const group_a = [
  "natsuiro_matsuri",
  "nekomata_okayu",
  "tokoyami_towa",
  "houshou_marine",
  "momosuzu_nene",
  "sakamata_chloe",
  "kazama_iroha",
  "watson_amelia",
  "ouro_kronii",
  "anya_melfissa",
  "moona_hoshinova",
];

const group_b = [
  "roboco",
  "sakura_miko",
  "hosimachi_suisei",
  "yozora_mel",
  "nakiri_ayame",
  "shirakami_fubuki",
  "tsunomaki_watame",
  "himemori_luna",
  "gawr_gura",
  "kobo_kanaeru",
  "kaela_kovalskia",
];

const group_c = [
  "tokino_sora",
  "aki_rosenthal",
  "ookami_mio",
  "yuzuki_choco",
  "oozora_subaru",
  "usada_pekora",
  "shirogane_noel",
  "takane_rui",
  "hakui_koyori",
  "kureiji_ollie",
  "pavolia_reine",
  "vestia_zeta",
];

const newPredictionState = atom<PredictionData>({
  key: "newPredictionState",
  default: {
    nickname: "",
    password: "",
    championshipPrediction: [],
    jakoPrediction: [],
    winner: "",
    runnerUp: "",
    thirdPlace: "",
    jako_winner: "",
    jako: "",
    createTimestamp: new Date(),
    modifyTimestamp: new Date(),
  },
});

// set api endpoint by NODE_ENV
const apiEndpoint =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://holocup.vercel.app";

export { group_a, group_b, group_c, newPredictionState, apiEndpoint };
