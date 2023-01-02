export type Member = {
  id: string;
  name_kr: string;
  name_jp: string;
  colorCode: string;
};

export type Career = {
  competition: string;
  league: string;
  result: string;
};

const MemberData: Member[] = [
  {
    id: "natsuiro_matsuri",
    name_kr: "나츠이로 마츠리",
    name_jp: "夏色まつり",
    colorCode: "#FFB6C1",
  },
  {
    id: "nekomata_okayu",
    name_kr: "네코마타 오카유",
    name_jp: "猫又おかゆ",
    colorCode: "#FFB6C1",
  },
  {
    id: "shirakami_fubuki",
    name_kr: "시라카미 후부키",
    name_jp: "白上フブキ",
    colorCode: "#FFB6C1",
  },
];

const getMemberData = (id: string) => {
  return MemberData.find((member) => member.id === id);
};

export { getMemberData };
