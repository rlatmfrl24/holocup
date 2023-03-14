"use client";

import { calculateRankingPoint, filterMemberData } from "@/app/util";
import { RoundDataType } from "@/utils/typeDef";
import { useFloating } from "@floating-ui/react";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

const RankingPoint: NextPage<{
  roundData: RoundDataType[];
  memberCode: string;
}> = ({ roundData, memberCode }) => {
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const { x, y, strategy, refs, placement } = useFloating({
    placement: "right-start",
    open: isShowTooltip,
    onOpenChange: setIsShowTooltip,
  });

  return (
    <h1 className="font-noto_kr font-bold text-xl flex flex-col gap-1">
      <div className="flex items-center gap-1">
        랭킹 포인트
        <button
          className="pt-1"
          ref={refs.setReference}
          onClick={() => {
            setIsShowTooltip(!isShowTooltip);
          }}
        >
          <Image
            className="w-6 h-6"
            alt="info"
            width={20}
            height={20}
            src="/icons/icon_help.svg"
            style={{ objectFit: "contain" }}
            draggable={false}
          />
        </button>
      </div>

      {isShowTooltip && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: "max-cotent",
          }}
          className="flex flex-col bg-black text-white font-bold font-noto_kr p-1 rounded text-sm "
        >
          <p>랭킹포인트는 각 라운드별 획득한 포인트를</p>
          <p>각 라운드 타입과 최근 기록 여부 등을</p>
          <p>가중치로 조정하여 계산한 포인트입니다.</p>
        </div>
      )}
      <span className="text-3xl">
        {calculateRankingPoint(filterMemberData(roundData, memberCode))}
      </span>
    </h1>
  );
};

export default RankingPoint;
