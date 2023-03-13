"use client";

import { ExpandMoreIcon } from "@/utils/iconFactory";
import { Listbox } from "@headlessui/react";
import { NextPage } from "next";

const CommonListBox: NextPage<{
  options: { id: string; value: string }[];
  selectedValue?: { id: string; value: string };
  setter?: (value: { id: string; value: string }) => void;
}> = ({ options, selectedValue, setter }) => {
  return (
    <div className="relative w-72 border border-slate-400 h-full font-noto_kr rounded z-10">
      <Listbox value={selectedValue} onChange={setter}>
        <Listbox.Button
          className={`w-full flex justify-between items-center px-2 py-1 ${
            selectedValue ? "" : "text-slate-500"
          }`}
        >
          <span>
            {selectedValue ? selectedValue.value : "Select an option"}
          </span>
          <ExpandMoreIcon />
        </Listbox.Button>
        <Listbox.Options
          className={`absolute border w-72 mt-1 border-slate-400 rounded`}
        >
          {options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              className="px-2 py-1 cursor-pointer bg-white hover:bg-slate-300"
            >
              {option.value}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default CommonListBox;
