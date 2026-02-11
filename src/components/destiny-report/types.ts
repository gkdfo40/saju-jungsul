export type DestinyReportData = {
  /** {유저네임}: 리포트를 받는 사용자 이름 */
  userName: string;

  /** {현재년도}: 리포트 기준 연도 */
  currentYear: number;

  /** {사주 한 줄 정의}: “OOO님의 사주 한 줄 정의” 본문 */
  oneLineDefinition: string;

  /** {핵심키워드1..3}: 사용자 핵심 키워드(3개) */
  coreKeywords: [string, string, string];

  /** {현재년도}년 요약 문장: 예) “미루면 손해가 되는 해입니다.” */
  yearSummary: string;

  /** 2-1 {타고난 성향과 기질 설명} */
  innateDisposition: string;

  /** 2-2 {강점이 발휘되고, 약해지는 순간 설명} */
  strengthMoments: string;

  /** 4. 사주를 구성하는 기본 만세력 섹션(문답/요약) */
  mansaeRyeok: {
    /** 섹션 상단 이미지(선택) */
    topLeftImageSrc?: string; // “이미지”
    topRightImageSrc?: string; // “이미지”

    /** {나는 어떤 사람} */
    whoAmI: string;

    /** {나의 재물과 직업} */
    wealthAndCareer: string;

    /** {나의 타고난 성향} */
    innateTendency: string;

    /** {나의 이성관계} */
    relationships: string;

    /** {나의 인생} */
    lifeFlow: string;

    /** {나에게 지금 필요한 것} */
    whatINeedNow: string;
  };

  /** 5. 용신/기신 섹션 */
  yinYang: {
    /** {필요한기운}: 예) “목(木)” */
    neededEnergy: string;

    /** {피해야할기운}: 예) “금(金)” */
    avoidEnergy: string;

    /** 오행 이미지(선택) */
    fiveElementsImageSrc?: string; // “5행 이미지”

    good: {
      /** 행운의 색({행운의 색}) */
      color: {
        name: string;
        /** {행운의 색 설명} */
        description: string;
      };
      /** 방향({행운의 방향}) */
      direction: {
        name: string;
        /** {행운의 방향 설명} */
        description: string;
      };
      /** 숫자({행운의 숫자}) */
      number: {
        value: string;
        /** {행운의 숫자 설명} */
        description: string;
      };
    };

    bad: {
      /** 피해야 할 색({피해야 할 색}) */
      color: {
        name: string;
        /** {피해야 할 색 설명} */
        description: string;
      };

      /** 음식({피해야할 음식}) */
      food: {
        name: string;
        /** {피해야할 음식 설명} (문서에는 본문이 중복되어 있어 설명 필드를 추가) */
        description?: string;
      };
    };
  };
};

