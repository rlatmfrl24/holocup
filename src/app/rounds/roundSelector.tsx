"use client";

import CommonListBox from "@/components/common/listbox";
import { CompetitionType, RoundDataType } from "@/utils/typeDef";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { mappingBlockType, mappingRoundType } from "../util";
import { useRoundDataStore } from "./store";

const RoundSelector: NextPage<{
  cupList: CompetitionType[];
  roundData: RoundDataType[];
}> = ({ cupList, roundData }) => {
  type RoundSelecterType = {
    cup_code: string;
    round_type: string;
    block: string;
  };

  const [roundSelecterState, setRoundSelecterState] =
    useState<RoundSelecterType>({
      cup_code: "",
      round_type: "",
      block: "",
    });

  const [roundSelectOptions, setRoundSelectOptions] = useState<
    {
      id: string;
      value: string;
    }[]
  >([]);
  const [blockSelectOptions, setBlockSelectOptions] = useState<
    | {
        id: string;
        value: string;
      }[]
  >([]);

  const [currentRoundData, setCurrentRoundData] =
    useState<RoundDataType[]>(roundData);

  useEffect(() => {
    // Filter by Cup Code
    let filteredRoundData = roundData.filter(
      (round) => round.cup_code === roundSelecterState.cup_code
    );

    // Make Round Options by Cup code
    const uniqueOptions = Array.from(
      new Set(filteredRoundData.map((round) => mappingRoundType(round.type).id))
    ).map((id) => {
      const roundType = mappingRoundType(id);
      return {
        id: roundType.id,
        value: roundType.value,
      };
    });
    setRoundSelectOptions(uniqueOptions);

    // Filter by Round Type
    filteredRoundData = filteredRoundData.filter(
      (round) => round.type === roundSelecterState.round_type
    );

    // Make Block Options by Round Type
    const blockSet = Array.from(
      new Set(filteredRoundData.map((round) => round.block))
    );

    if (blockSet.length > 0 && blockSet[0] !== undefined) {
      const uniqueBlockOptions = blockSet.map((block) => {
        return mappingBlockType(block!);
      });
      setBlockSelectOptions(uniqueBlockOptions);
    } else {
      setBlockSelectOptions([]);
    }

    // Filter by Block
    if (roundSelecterState.block !== "") {
      filteredRoundData = filteredRoundData.filter(
        (round) => round.block === roundSelecterState.block
      );
    }

    setCurrentRoundData(filteredRoundData);
  }, [
    roundData,
    roundSelecterState.block,
    roundSelecterState.cup_code,
    roundSelecterState.round_type,
  ]);

  return (
    <div className="flex gap-3">
      <CommonListBox
        options={cupList}
        selectedValue={cupList.find(
          (cup) => cup.id === roundSelecterState.cup_code
        )}
        setter={(value) => {
          setRoundSelecterState({
            cup_code: value.id,
            round_type: "",
            block: "",
          });
        }}
      />
      <CommonListBox
        options={roundSelectOptions}
        selectedValue={roundSelectOptions.find(
          (option) => option.id === roundSelecterState.round_type
        )}
        setter={(value) => {
          setRoundSelecterState({
            ...roundSelecterState,
            round_type: value.id,
            block: "",
          });
        }}
      />
      {blockSelectOptions.length > 0 &&
        roundSelecterState.round_type !== "" && (
          <CommonListBox
            options={blockSelectOptions}
            selectedValue={blockSelectOptions.find(
              (option) => option.id === roundSelecterState.block
            )}
            setter={(value) => {
              setRoundSelecterState({
                ...roundSelecterState,
                block: value.id,
              });
            }}
          />
        )}
      <button
        className="bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-800 font-medium font-poppins"
        onClick={() => {
          if (currentRoundData.length === 1) {
            useRoundDataStore.setState({
              roundData: currentRoundData[0],
            });
          }
        }}
      >
        Search
      </button>
    </div>
  );
};

export default RoundSelector;
