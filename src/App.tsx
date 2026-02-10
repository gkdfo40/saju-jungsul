import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DateWheelPicker } from "@/components/ui/date-wheel-picker";
import { TimeWheelPicker } from "@/components/ui/time-wheel-picker";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState({ year: 1990, month: 1, day: 2 });
  const [selectedTime, setSelectedTime] = useState({ period: 0, hour: 12, minute: 0 });
  return (
    <div className="flex min-h-svh items-center justify-center py-16">
      <div className="flex flex-col items-start gap-8 max-w-3xl w-full px-8">

        {/* ===== Font Family ===== */}
        <section className="w-full space-y-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Font Family</h2>

          <div className="space-y-3 border-b border-border pb-4">
            <p className="text-xs text-muted-foreground">font-primary — Gowun Dodum (고운 도둠)</p>
            <p className="font-primary text-2xl">
              사주정설 — 타고난 사주 팔자를 분석하여 운명의 흐름을 읽어드립니다.
            </p>
            <p className="text-xs text-muted-foreground">font-secondary — Nanum Pen Script (나눔손편지)</p>
            <p className="font-secondary text-2xl">
              사주정설 — 타고난 사주 팔자를 분석하여 운명의 흐름을 읽어드립니다.
            </p>
          </div>
        </section>

        {/* ===== Typography ===== */}
        <section className="w-full space-y-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Typography Scale</h2>

          {/* Display */}
          <div className="space-y-2 border-b border-border pb-4">
            <p className="text-xs text-muted-foreground">Display 1 — 50px / 70px (Primary)</p>
            <p className="font-primary" style={{ fontSize: 'var(--display-1-size)', lineHeight: 'var(--display-1-line-height)', fontWeight: 'var(--display-1-weight)' }}>
              사주정설 Display 1
            </p>
            <p className="font-secondary" style={{ fontSize: 'var(--display-1-size)', lineHeight: 'var(--display-1-line-height)', fontWeight: 'var(--display-1-weight)' }}>
              사주정설 Display 1
            </p>
            <p className="text-xs text-muted-foreground">Display 2 — 40px / 56px</p>
            <p className="font-primary" style={{ fontSize: 'var(--display-2-size)', lineHeight: 'var(--display-2-line-height)', fontWeight: 'var(--display-2-weight)' }}>
              사주정설 Display 2
            </p>
            <p className="font-secondary" style={{ fontSize: 'var(--display-2-size)', lineHeight: 'var(--display-2-line-height)', fontWeight: 'var(--display-2-weight)' }}>
              사주정설 Display 2
            </p>
          </div>

          {/* Heading */}
          <div className="space-y-2 border-b border-border pb-4">
            <p className="text-xs text-muted-foreground">Heading 0 — 28px / 36px / Black</p>
            <p style={{ fontSize: 'var(--heading-0-size)', lineHeight: 'var(--heading-0-line-height)', fontWeight: 'var(--heading-0-weight)' }}>
              사주정설 Heading 0
            </p>
            <p className="text-xs text-muted-foreground">Heading 1 — 24px / 34px / Black</p>
            <p style={{ fontSize: 'var(--heading-1-size)', lineHeight: 'var(--heading-1-line-height)', fontWeight: 'var(--heading-1-weight)' }}>
              사주정설 Heading 1
            </p>
            <p className="text-xs text-muted-foreground">Heading 2 — 22px / 31px / Black</p>
            <p style={{ fontSize: 'var(--heading-2-size)', lineHeight: 'var(--heading-2-line-height)', fontWeight: 'var(--heading-2-weight)' }}>
              사주정설 Heading 2
            </p>
          </div>

          {/* Title */}
          <div className="space-y-2 border-b border-border pb-4">
            <p className="text-xs text-muted-foreground">Title 0 — 18px / 24px / Black</p>
            <p style={{ fontSize: 'var(--title-0-size)', lineHeight: 'var(--title-0-line-height)', fontWeight: 'var(--title-0-weight)' }}>
              사주정설 Title 0
            </p>
            <p className="text-xs text-muted-foreground">Title 1 — 16px / 22px / Black</p>
            <p style={{ fontSize: 'var(--title-1-size)', lineHeight: 'var(--title-1-line-height)', fontWeight: 'var(--title-1-weight)' }}>
              사주정설 Title 1
            </p>
            <p className="text-xs text-muted-foreground">Title 2 — 15px / 21px / Black</p>
            <p style={{ fontSize: 'var(--title-2-size)', lineHeight: 'var(--title-2-line-height)', fontWeight: 'var(--title-2-weight)' }}>
              사주정설 Title 2
            </p>
          </div>

          {/* Body */}
          <div className="space-y-2 border-b border-border pb-4">
            <p className="text-xs text-muted-foreground">Body 1 — 13px / 20px / Black</p>
            <p style={{ fontSize: 'var(--body-1-size)', lineHeight: 'var(--body-1-line-height)', fontWeight: 'var(--body-1-weight)' }}>
              사주정설 Body 1 — 타고난 사주 팔자를 분석하여 운명의 흐름을 읽어드립니다.
            </p>
            <p className="text-xs text-muted-foreground">Body 2 — 12px / 18px / Regular</p>
            <p style={{ fontSize: 'var(--body-2-size)', lineHeight: 'var(--body-2-line-height)', fontWeight: 'var(--body-2-weight)' }}>
              사주정설 Body 2 — 타고난 사주 팔자를 분석하여 운명의 흐름을 읽어드립니다.
            </p>
          </div>

          {/* Label */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Label 1 — 10px / 14px / Regular</p>
            <p style={{ fontSize: 'var(--label-1-size)', lineHeight: 'var(--label-1-line-height)', fontWeight: 'var(--label-1-weight)' }}>
              사주정설 Label 1 — 보조 텍스트 및 캡션에 사용됩니다.
            </p>
          </div>
        </section>

        {/* ===== Colors ===== */}
        <section className="w-full space-y-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Colors</h2>

          {/* Primary */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Primary</p>
            <div className="flex gap-1.5">
              {([
                ["10", "bg-primary-10"],
                ["50", "bg-primary-50"],
                ["100", "bg-primary-100"],
                ["200", "bg-primary-200"],
                ["300", "bg-primary-300"],
                ["400", "bg-primary-400"],
                ["500", "bg-primary-500"],
                ["600", "bg-primary-600"],
                ["700", "bg-primary-700"],
                ["800", "bg-primary-800"],
                ["900", "bg-primary-900"],
              ] as const).map(([label, cls]) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className={`h-10 w-10 rounded-md ${cls}`} />
                  <span className="text-[10px] text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Secondary</p>
            <div className="flex gap-1.5">
              {([
                ["10", "bg-secondary-10"],
                ["50", "bg-secondary-50"],
                ["100", "bg-secondary-100"],
                ["200", "bg-secondary-200"],
                ["300", "bg-secondary-300"],
                ["400", "bg-secondary-400"],
                ["500", "bg-secondary-500"],
                ["600", "bg-secondary-600"],
                ["700", "bg-secondary-700"],
                ["800", "bg-secondary-800"],
                ["900", "bg-secondary-900"],
              ] as const).map(([label, cls]) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className={`h-10 w-10 rounded-md ${cls}`} />
                  <span className="text-[10px] text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Semantic</p>
            <div className="flex gap-1.5">
              {[
                { name: "fire", cls: "bg-fire" },
                { name: "earth", cls: "bg-earth" },
                { name: "water", cls: "bg-water border" },
                { name: "gold", cls: "bg-gold" },
                { name: "navy", cls: "bg-navy" },
                { name: "violet", cls: "bg-violet" },
                { name: "gray-blue", cls: "bg-gray-blue" },
              ].map(({ name, cls }) => (
                <div key={name} className="flex flex-col items-center gap-1">
                  <div className={`h-10 w-10 rounded-md ${cls}`} />
                  <span className="text-[10px] text-muted-foreground">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Buttons ===== */}
        <section className="w-full space-y-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Buttons</h2>
          <div className="flex gap-3 items-center">
            <Button>시작하기</Button>
            <Button variant="secondary">더 알아보기</Button>
            <Button variant="outline">설정</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">삭제</Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">CTA — violet/white opacity 단계별 (default → hover → pressed)</p>
            <div className="flex gap-3 items-center rounded-lg bg-navy p-4">
              <Button variant="cta">운세 보기</Button>
              <Button variant="cta" size="lg">사주 분석 시작</Button>
            </div>
          </div>
        </section>

        {/* ===== Input ===== */}
        <section className="w-full space-y-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Input</h2>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">variant="default" (shadcn 기본)</p>
            <div className="flex gap-3">
              <Input placeholder="기본 입력" />
              <Input defaultValue="입력된 값" />
              <Input disabled placeholder="비활성화" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">variant="glass" (글래스모피즘)</p>
            <div className="flex flex-col gap-4 rounded-lg bg-navy p-6">
              <div className="space-y-1">
                <p className="text-[10px] text-white/40">placeholder (입력 전)</p>
                <Input variant="glass" placeholder="텍스트 입력 전" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-white/40">controlled (입력 중 / 클리어 가능)</p>
                <Input
                  variant="glass"
                  placeholder="이름을 입력하세요"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onClear={() => setInputValue("")}
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-white/40">filled (입력 후)</p>
                <Input variant="glass" defaultValue="입력 후" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== DateWheelPicker ===== */}
        <section className="w-full space-y-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Date Wheel Picker</h2>
          <div className="flex gap-6 items-start">
            <DateWheelPicker
              value={selectedDate}
              onChange={setSelectedDate}
              onClose={() => alert("닫기")}
              onConfirm={(date) =>
                alert(`선택: ${date.year}년 ${date.month}월 ${date.day}일`)
              }
            />
            <div className="space-y-1 pt-2">
              <p className="text-xs text-muted-foreground">선택된 날짜</p>
              <p className="text-lg font-bold">
                {selectedDate.year}년 {selectedDate.month}월 {selectedDate.day}일
              </p>
            </div>
          </div>
        </section>

        {/* ===== TimeWheelPicker ===== */}
        <section className="w-full space-y-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Time Wheel Picker</h2>
          <div className="flex gap-6 items-start">
            <TimeWheelPicker
              value={selectedTime}
              onChange={setSelectedTime}
              onClose={() => alert("닫기")}
              onConfirm={(time) =>
                alert(
                  `선택: ${time.period === 0 ? "오전" : "오후"} ${time.hour}시 ${String(time.minute).padStart(2, "0")}분`
                )
              }
            />
            <div className="space-y-1 pt-2">
              <p className="text-xs text-muted-foreground">선택된 시간</p>
              <p className="text-lg font-bold">
                {selectedTime.period === 0 ? "오전" : "오후"} {selectedTime.hour}시{" "}
                {String(selectedTime.minute).padStart(2, "0")}분
              </p>
            </div>
          </div>
        </section>

        {/* ===== SVG Icons ===== */}
        <section className="w-full space-y-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">SVG Icons</h2>
          <div className="flex flex-wrap gap-4">
            {[
              "Star 10.svg",
              "Vector.svg",
              "common_sparkle_ic.svg",
              "home_arrow_right_default_ic.svg",
              "home_arrow_right_pressed_ic.svg",
              "home_checkbox_default_ic.svg",
              "home_checkbox_selected_ic.svg",
              "home_female_default_ic.svg",
              "home_female_selected_ic.svg",
              "home_input_delete_ic.svg",
              "home_logo_ic.svg",
              "home_male_selected_ic.svg",
              "home_moon_default_ic.svg",
              "home_sun_default_ic.svg",
              "home_sun_moon_ic.svg",
              "home_sun_selected_ic.svg",
              "home_yoon_default_ic.svg",
              "home_yoon_selected_ic.svg",
            ].map((file) => (
              <div key={file} className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-white p-2">
                  <img
                    src={`/images/${file}`}
                    alt={file}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className="max-w-20 truncate text-[10px] text-muted-foreground" title={file}>
                  {file.replace('.svg', '')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Background Images (AVIF) ===== */}
        <section className="w-full space-y-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Background Images</h2>
          <div className="flex flex-wrap gap-4">
            {[
              "home_bg_img.avif",
              "body_bg_img 1.avif",
              "cover_bg_img 1.avif",
            ].map((file) => (
              <div key={file} className="flex flex-col items-center gap-2">
                <div className="h-32 w-48 overflow-hidden rounded-lg border border-border">
                  <img
                    src={`/images/${file}`}
                    alt={file}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {file.replace('.avif', '')}
                </span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;
