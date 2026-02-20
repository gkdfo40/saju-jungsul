/** 배경 이미지 home_bg_img.avif 사용하고 배경은 스크롤 고정한다
 *
 * 고정된 배경 위에 스크롤 가능한 페이지 영역을 둔다
 * 페이지 폰트는 기본 'Gowun Dodum Custom'를 사용한다
 * 페이지는 가운데 정렬 width: 335px
 *
 * header-area
 * fontColor: white, fontSize: heading0 fontWeight:Black- 당신의 소우주(小宇宙)를 마주할 시간
 * fontColor: white/60%, fontSize: Title2, fontWeight: Regular - 정확한 사주 분석을 위해 정보를 입력해 주세요
 *
 * main-area
 * backgroundColor: navy/60%, border: 선형 그라데이션 #A97F00 -> #433200, borderRadius:16px, paddingVertical: 40px, paddingHorizontal: 16px,
 */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div
      className="min-h-svh bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url(/images/home_bg_img.avif)" }}
    >
      <div className="min-h-svh overflow-auto flex justify-center px-4 py-8 font-primary">
        <div className="w-[335px] flex flex-col gap-3  break-keep">
          {/* header-area */}
          <header className="flex flex-col gap-2 text-center">
            <h1
              className="text-white"
              style={{
                fontSize: "var(--heading-0-size)",
                lineHeight: "var(--heading-0-line-height)",
                fontWeight: "var(--heading-0-weight)",
              }}
            >
              당신의 소우주(小宇宙)를 마주할 시간
            </h1>
            <p
              className="text-white/60"
              style={{
                fontSize: "var(--title-2-size)",
                lineHeight: "var(--title-2-line-height)",
                fontWeight: "var(--font-regular)",
              }}
            >
              정확한 사주 분석을 위해 정보를 입력해 주세요
            </p>
          </header>

          {/* main-area: 배경 navy/60%, 테두리 border-image 그라데이션 #A97F00 → #433200 */}
          <main className="mt-10 outline -outline-offset-1 outline-yellow-700 backdrop-blur-[1px]  rounded-2xl bg-navy/60 py-10 px-4 border-2 border-solid border-transparent">
            <form className="flex flex-col gap-10">
              <Button variant="cta" type="submit" className="flex h-13">
                제출하기
                <ArrowRight />
              </Button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
