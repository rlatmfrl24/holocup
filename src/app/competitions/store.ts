import { CompetitionType } from "@/utils/typeDef";
import { create } from "zustand";

interface SelectedCompetitionState {
  selectedCompetition: CompetitionType | undefined;
  setSelectedCompetition: (selectedCompetition: CompetitionType) => void;
}

export const useSelectedCompetitionStore = create<SelectedCompetitionState>(
  (set) => ({
    selectedCompetition: undefined,
    setSelectedCompetition: (selectedCompetition: CompetitionType) =>
      set({ selectedCompetition }),
  })
);
