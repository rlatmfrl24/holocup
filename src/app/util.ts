import { RoundDataType } from "@/utils/typeDef";

function avgRoundRankingPoint(roundData: RoundDataType[], members: string[]) {
  const membersRankingPointList = members.map((member) => {
    const memberRoundData = filterMemberData(roundData, member);

    const rankingPoint = calculateRankingPoint(memberRoundData);
    return rankingPoint;
  });

  const sum = membersRankingPointList.reduce((a, b) => a + b, 0);
  const avg = sum / membersRankingPointList.length || 0;
  const roundedAvg = Math.round((avg + Number.EPSILON) * 100) / 100;

  return roundedAvg;
}

function calculateRankingPoint(memberRoundData: RoundDataType[]) {
  const pointList = memberRoundData.map((round) => {
    let modifiedPoint = round.details[0].point;
    let threshold = 0;
    if (round.type === "tryout") {
      threshold = 1;
    } else if (round.type === "championship") {
      threshold = 2;
    } else if (round.type === "jakocup") {
      threshold = 0.5;
    } else {
      threshold = 0.75;
    }

    modifiedPoint = modifiedPoint * threshold;

    const currentYear = new Date().getFullYear();
    const roundYear = parseInt(
      round.code.split("_")[0].replace("NY", "").replace("ENIDTNMT", "")
    );

    threshold = 1 - Math.abs(currentYear - roundYear) * 0.05;
    modifiedPoint = modifiedPoint * threshold;

    return modifiedPoint;
  });

  // get average point
  const sum = pointList.reduce((a, b) => a + b, 0);
  const avg = sum / pointList.length || 0;

  // round to 2 decimal places
  const roundedAvg = Math.round((avg + Number.EPSILON) * 100) / 100;

  return roundedAvg;
}

function filterMemberData(
  roundData: RoundDataType[],
  memberCode: string
): RoundDataType[] {
  const filtered = roundData
    .map((round) => {
      const raceData = round.details.filter((detail) => {
        return detail.code === memberCode;
      });

      return {
        code: round.code,
        cup_code: round.cup_code,
        type: round.type,
        block: round.block,
        members: round.members,
        details: raceData,
      };
    })
    .filter((round) => round.details.length > 0);
  return filtered;
}

function parseRoundCode(roundCode: string): string {
  const roundCodeSplit = roundCode.split("_");
  if (roundCodeSplit[0].includes("ENIDTNMT")) {
    return (
      mappingCupType(roundCodeSplit[0]) +
      " " +
      mappingBlockType(roundCodeSplit[1]).value
    );
  } else {
    if (roundCodeSplit.length === 3) {
      return (
        mappingCupType(roundCodeSplit[0]) +
        " " +
        mappingRoundType(roundCodeSplit[1].toLowerCase()).value +
        " " +
        mappingBlockType(roundCodeSplit[2]).value
      );
    } else {
      return (
        mappingCupType(roundCodeSplit[0]) +
        " " +
        mappingRoundType(roundCodeSplit[1].toLowerCase()).value
      );
    }
  }
}

function mappingCupType(cupCode: string): string {
  if (cupCode.includes("NY")) {
    return "??????????????? ????????? " + cupCode.replace("NY", "");
  } else if (cupCode.includes("ENIDTNMT")) {
    return "EN ID ???????????? " + cupCode.replace("ENIDTNMT", "");
  } else {
    return "??????";
  }
}

function mappingRoundType(type: string): { id: string; value: string } {
  switch (type) {
    case "tryout":
      return {
        id: type,
        value: "??????",
      };
    case "championship":
      return {
        id: type,
        value: "??????",
      };
    case "jakocup":
      return {
        id: type,
        value: "?????????",
      };
    default:
      return {
        id: type,
        value: "??????",
      };
  }
}

function mappingBlockType(block: string) {
  switch (block) {
    case "all star cup":
      return {
        id: block,
        value: "????????????",
      };
    case "en id round":
      return {
        id: block,
        value: "EN vs ID ?????????",
      };
    case "suffle round":
      return {
        id: block,
        value: "?????? ?????????",
      };
    default:
      return {
        id: block,
        value: "Block " + block.toUpperCase(),
      };
  }
}

function colorCodeToRGBwithOpacity(colorCode: string, opacity: number): string {
  const r = parseInt(colorCode.substring(1, 3), 16);
  const g = parseInt(colorCode.substring(3, 5), 16);
  const b = parseInt(colorCode.substring(5, 7), 16);

  return `rgb(${r}, ${g}, ${b}, ${opacity})`;
}

export {
  parseRoundCode,
  filterMemberData,
  calculateRankingPoint,
  avgRoundRankingPoint,
  mappingRoundType,
  mappingBlockType,
  mappingCupType,
  colorCodeToRGBwithOpacity,
};
