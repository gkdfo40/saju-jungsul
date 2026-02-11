import type { DestinyReportData } from "./types";

export const sampleDestinyReportData: DestinyReportData = {
  userName: "홍길동",
  currentYear: new Date().getFullYear(),
  oneLineDefinition: "균형감각이 뛰어나며, 때를 알면 크게 도약하는 사람",
  coreKeywords: ["균형", "성장", "결단"],
  yearSummary: "미루면 손해가 되는 해입니다.",
  innateDisposition:
    "당신은 온화하지만 기준이 분명한 사람입니다. 주변의 흐름을 읽고 조율하는 능력이 좋아 관계에서 신뢰를 얻습니다.",
  strengthMoments:
    "목표가 명확할 때 강점이 극대화됩니다. 반대로, 기준이 모호해지면 고민이 길어져 에너지가 분산될 수 있습니다.",
  mansaeRyeok: {
    topLeftImageSrc: undefined,
    topRightImageSrc: undefined,
    whoAmI:
      "핵심은 ‘조율’입니다. 큰 그림을 보고 리듬을 맞추며, 완급 조절로 결과를 만들어냅니다.",
    wealthAndCareer:
      "재물은 꾸준함에서 옵니다. 직업은 기획/운영/관리처럼 구조를 만드는 일과 궁합이 좋습니다.",
    innateTendency:
      "신중하게 관찰하고 결정합니다. 시작은 느릴 수 있으나, 한번 방향이 잡히면 실행이 빠릅니다.",
    relationships:
      "관계에서는 안정과 신뢰가 중요합니다. 명확한 약속과 일관된 태도가 매력을 키웁니다.",
    lifeFlow:
      "단계적으로 성장하는 흐름입니다. 작은 성취가 쌓이며 큰 전환점을 만드는 타입입니다.",
    whatINeedNow:
      "우선순위를 정하고, ‘지금 할 일’과 ‘나중에 할 일’을 분리하는 것이 필요합니다.",
  },
  yinYang: {
    neededEnergy: "목(木)",
    avoidEnergy: "금(金)",
    fiveElementsImageSrc: undefined,
    good: {
      color: {
        name: "초록",
        description:
          "회복과 성장의 리듬을 살려줍니다. 작은 루틴을 유지할 때 집중이 좋아집니다.",
      },
      direction: {
        name: "동쪽",
        description:
          "시작과 확장의 기운이 강합니다. 새로운 계획을 실행할 때 흐름이 좋아집니다.",
      },
      number: {
        value: "3",
        description:
          "균형을 깨지 않으면서도 속도를 내는 숫자입니다. 선택지를 줄이는 데 도움이 됩니다.",
      },
    },
    bad: {
      color: {
        name: "회색",
        description:
          "에너지를 눌러서 망설임이 길어질 수 있습니다. 중요한 결정 앞에서는 피하는 편이 좋습니다.",
      },
      food: {
        name: "매운 음식",
        description:
          "과열되기 쉬운 날에는 컨디션을 흔들 수 있습니다. 자극을 줄이면 집중이 좋아집니다.",
      },
    },
  },
};

