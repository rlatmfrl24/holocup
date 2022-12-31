import Layout from "../components/layout";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";

const InfoPage = () => {
  const imgList = [
    "/images/infos/info_japanese.jfif",
    "/images/infos/info_english.jfif",
    "/images/infos/rules_korean.webp",
    "/images/infos/entry.png",
  ];
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, imgList.length, page);
  const paginate = (newDirection: number) => {
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
        <motion.img
          className="w-full h-full flex-shrink-0"
          key={page}
          src={imgList[imageIndex]}
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
        />
      </AnimatePresence>
    );
  };

  return (
    <Layout>
      <div className="p-3 gap-3 font-noto_kr flex-1 flex overflow-x-hidden">
        <button onClick={() => paginate(-1)}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <div className="flex relative">
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
