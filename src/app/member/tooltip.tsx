"use client";

import { useFloating } from "@floating-ui/react";
import Image from "next/image";
import { useState } from "react";

const LeaderboardTooltip = () => {
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const { x, y, strategy, refs, placement } = useFloating({
    placement: "right-start",
    open: isShowTooltip,
    onOpenChange: setIsShowTooltip,
  });

  return (
    <>
      <button
        ref={refs.setReference}
        onClick={() => {
          setIsShowTooltip(!isShowTooltip);
        }}
      >
        <Image src="/icons/icon_help.svg" alt="help" width={20} height={20} />
      </button>
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
          <p>리더보드는 각 멤버의 랭킹포인트 순으로 정렬되어 있습니다.</p>
          <p>멤버의 라운드별 성적을 확인하려면 멤버명을 클릭해주세요.</p>
        </div>
      )}
    </>
  );
};

export default LeaderboardTooltip;
