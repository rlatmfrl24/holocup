import { RoundDataType } from "@/utils/typeDef";
import { create } from "zustand";

interface RoundDataStore {
  roundData: RoundDataType;
  setRoundData: (roundData: RoundDataType) => void;
}

export const useRoundDataStore = create<RoundDataStore>((set) => ({
  roundData: {} as RoundDataType,
  setRoundData: (roundData: RoundDataType) => set({ roundData }),
}));

interface EmphasizeMemberCodeState {
  emphasizeMemberCode: string;
  setEmphasizeMemberCode: (emphasizeMemberCode: string) => void;
}

export const useEmphasizeMemberCodeStore = create<EmphasizeMemberCodeState>(
  (set) => ({
    emphasizeMemberCode: "",
    setEmphasizeMemberCode: (emphasizeMemberCode: string) =>
      set({ emphasizeMemberCode }),
  })
);
