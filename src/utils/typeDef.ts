import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

export type MemberType = {
  id: string;
  name_kr: string;
  belong: string;
  belong_name: string;
  color_primary: string;
  color_secondary: string;
  color_third: string;
  oshi_mark: string;
};

export type CompetitionType = {
  id: string;
  value: string;
};

export type RoundDataType = {
  code: string;
  cup_code: string;
  type: string;
  block: string | undefined;
  members: string[];
  details: RoundDetailType[];
};

export type RoundDetailType = {
  code: string;
  rank: number;
  point: number;
  race_results: number[];
};
