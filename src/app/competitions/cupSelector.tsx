"use client";

import CommonListBox from "@/components/common/listbox";
import { NextPage } from "next";
import { useSelectedCompetitionStore } from "./store";

const CupSelector: NextPage<{
  cupList: { id: string; value: string }[];
}> = ({ cupList }) => {
  const availableCups = cupList.filter((cup) => cup.id.includes("NY"));

  const selectedCup = useSelectedCompetitionStore(
    (state) => state.selectedCompetition
  );
  const setSelectedCup = useSelectedCompetitionStore(
    (state) => state.setSelectedCompetition
  );

  return (
    <div className="flex gap-3 items-center">
      <h1 className="text-2xl font-bold">Competitions</h1>
      <CommonListBox
        options={availableCups}
        selectedValue={selectedCup}
        setter={setSelectedCup}
      />
    </div>
  );
};

export default CupSelector;
