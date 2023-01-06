import { Timestamp } from "mongodb";

export type RaceData = {
  code: string;
  name_kr: string;
  rank: number;
  point: number;
  race_results: number[];
};

export type EntryData = {
  name_kr: string;
  code: string;
  race_code: string;
  cup_code: string;
  cup_name: string;
  rank: number;
  point: number;
  race_results: number[];
};

export type PredictionData = {
  nickname: string;
  password: string;
  championshipPrediction: string[];
  jakoPrediction: string[];
  winner: string;
  runnerUp: string;
  thirdPlace: string;
  jako_winner: string;
  jako: string;
  createTimestamp: Date;
  modifyTimestamp: Date;
};

export enum LOGIN_STATUS {
  SUCCESS = "success",
  PWD_ERROR = "pwd_error",
  NO_USER = "no_user",
}
