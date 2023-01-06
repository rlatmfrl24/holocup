import Layout from "../components/layout";
import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const Rules = () => {
  return (
    <div className="flex-1 flex flex-col px-48 justify-center">
      <div className="font-bold text-2xl font-noto_kr mb-11">기본 규칙</div>
      <div className="font-noto_kr justify-center flex items-center">
        <div className="flex flex-col flex-1 gap-3">
          <div className="flex flex-col gap-5">
            <div>1) 그룹별 참가자는 24명으로 구성됩니다.</div>
            <div>
              2) 각 그룹별 6번의 레이스를 진행하며, 각 레이스별 점수를 합산하여
              그룹별 순위를 결정합니다.
            </div>
            <div>
              3) 그룹별 상위 4명은 츠요컵에 진출하며, 하위 4명은 자코컵으로
              진출합니다.
            </div>
            <div>
              4) 츠요컵은 6번의 레이스를 진행하며, 각 레이스별 점수를 합산하여
              최종 순위를 결정합니다.
            </div>
            <div>
              5) 자코컵도 6번의 레이스를 진행하며, 각 레이스별 점수를 합산하여
              최종 순위를 결정합니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoPage = () => {
  const imgList = [
    "/images/infos/info_japanese.jfif",
    "/images/infos/info_english.jfif",
    "/images/infos/rules_korean.webp",
    "/images/infos/entry.png",
  ];

  let PageList: ReactNode[] = imgList.map((img, index) => {
    return (
      <Image
        key={index}
        className="flex-1"
        alt="info"
        src={imgList[index]}
        fill
        style={{ objectFit: "contain" }}
        draggable={false}
      />
    );
  });

  PageList = [...PageList, <Rules key={PageList.length} />];

  const [[page, direction], setPage] = useState([0, 0]);
  const paginate = (newDirection: number) => {
    if (page === 0 && newDirection === -1) {
      setPage([PageList.length - 1, newDirection]);
      return;
    }
    if (page === PageList.length - 1 && newDirection === 1) {
      setPage([0, newDirection]);
      return;
    }

    setPage([page + newDirection, newDirection]);
  };
  const InfoBox = () => {
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
      return Math.abs(offset) * velocity;
    };

    const variants = {
      enter: (direction: number) => {
        return {
          x: direction > 0 ? 1000 : -1000,
          opacity: 0,
        };
      },
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
      },
      exit: (direction: number) => {
        return {
          zIndex: 0,
          x: direction < 0 ? 1000 : -1000,
          opacity: 0,
        };
      },
    };

    return (
      <AnimatePresence custom={direction}>
        <motion.div
          className="w-full h-full flex-1 flex"
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          {PageList[page]}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <Layout>
      <div className="p-3 gap-3 font-noto_kr flex-1 flex overflow-x-hidden">
        <button onClick={() => paginate(-1)}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <div className="flex relative flex-1">
          <InfoBox />
        </div>
        <button onClick={() => paginate(1)}>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </Layout>
  );
};

export default InfoPage;
