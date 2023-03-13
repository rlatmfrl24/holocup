"use client";

import Image from "next/image";

const BackButton = () => {
  return (
    <div
      className="flex w-fit items-center mb-4 p-2 gap-2 font-noto_kr font-medium hover:outline rounded cursor-pointer"
      onClick={() => {
        window.history.back();
      }}
    >
      <Image
        src={`/icons/icon_arrow_back.svg`}
        width={20}
        height={20}
        alt="뒤로 가기"
      />
      뒤로 가기
    </div>
  );
};

export default BackButton;
