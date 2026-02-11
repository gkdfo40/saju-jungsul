# pdf-viewer 페이지

## 무엇을 구현하고자 하는가

프론트에서 pdf 파일을 생성하는것이 목적.
그다음으로 해당 pdf파일을 보는것이 목적.

## 어떻게 보여주고자 하는가?

react-pdf 라이브러리를 사용하여 파일 생성 및 시각화한다.

## 디자인 시스템 있는가?

컬러 및 폰트

```
  /* Custom Primary Color Scale: e.g. bg-primary-500, text-primary-100 */
  --color-primary-10: #E5EBE8;
  --color-primary-50: #E5EBE8;
  --color-primary-100: #B4C6BC;
  --color-primary-200: #A2B9AC;
  --color-primary-300: #7F9D8E;
  --color-primary-400: #6D907F;
  --color-primary-500: #607E6F;
  --color-primary-600: #536D60;
  --color-primary-700: #465D51;
  --color-primary-800: #2B3933;
  --color-primary-900: #1E2723;

  /* Custom Secondary Color Scale: e.g. bg-secondary-500, text-secondary-100 */
  --color-secondary-10: #E8E7E4;
  --color-secondary-50: #DBD9D5;
  --color-secondary-100: #CDC8C4;
  --color-secondary-200: #C0BAB3;
  --color-secondary-300: #A39C92;
  --color-secondary-400: #978D81;
  --color-secondary-500: #767063;
  --color-secondary-600: #454039;
  --color-secondary-700: #454039;
  --color-secondary-800: #454039;
  --color-secondary-900: #34302C;

  /* Semantic Colors: e.g. bg-fire, text-gold */
  --color-fire: #744D4C;
  --color-earth: #AB9657;
  --color-water: #F3EFE5;
  --color-gold: #FFC800;
  --color-navy: #000220;
  --color-violet: #4913C7;
  --color-gray-blue: #8E90B1;

  /* Font Family: e.g. font-primary, font-secondary */
  --font-primary: 'Gowun Dodum', sans-serif;
  --font-secondary: 'Nanum Pen Script', cursive;

    /* =========================
     Font Family
     ========================= */
  --font-primary: 'Gowun Dodum', sans-serif;
  --font-secondary: 'Nanum Pen Script', cursive;

  /* =========================
     Font Weights
     ========================= */
  --font-regular: 400;
  --font-bold: 700;
  --font-black: 900;

  /* =========================
     Display
     ========================= */
  --display-1-size: 50px;
  --display-1-line-height: 70px;
  --display-1-weight: var(--font-regular);

  --display-2-size: 40px;
  --display-2-line-height: 56px;
  --display-2-weight: var(--font-regular);

  /* =========================
     Heading
     ========================= */
  --heading-0-size: 28px;
  --heading-0-line-height: 36px;
  --heading-0-weight: var(--font-black);

  --heading-1-size: 24px;
  --heading-1-line-height: 34px;
  --heading-1-weight: var(--font-black);

  --heading-2-size: 22px;
  --heading-2-line-height: 31px;
  --heading-2-weight: var(--font-black);

  /* =========================
     Title
     ========================= */
  --title-0-size: 18px;
  --title-0-line-height: 24px;
  --title-0-weight: var(--font-black);

  --title-1-size: 16px;
  --title-1-line-height: 22px;
  --title-1-weight: var(--font-black);

  --title-2-size: 15px;
  --title-2-line-height: 21px;
  --title-2-weight: var(--font-black);

  /* =========================
     Body
     ========================= */
  --body-1-size: 13px;
  --body-1-line-height: 20px;
  --body-1-weight: var(--font-black);

  --body-2-size: 12px;
  --body-2-line-height: 18px;
  --body-2-weight: var(--font-regular);

  /* =========================
     Label
     ========================= */
  --label-1-size: 10px;
  --label-1-line-height: 14px;
  --label-1-weight: var(--font-regular);

```

공통 레이아웃

```
Page
 View 뒷배경으로 위치함.
  Image - 배경 이미지
 View 뒷배경 위에 위치함
    children
```

구분선

```
{style: width: 100%, height: 1, bgColor: }
View
```

푸터

```
<div class="w-[595px] h-7 px-7 bg-neutral-600/10 inline-flex flex-col justify-start items-center gap-[3px]">
    <div class="self-stretch h-[535px] origin-top-left -rotate-90 outline outline-1 outline-offset-[-0.50px] outline-gray-400"></div>
    <div class="text-center justify-start text-neutral-600 text-xs font-black font-['Gowun_Dodum_Custom'] leading-5">pn</div>
</div>
```

## 무엇을 보여주고자 하는가?

보여줄 내용은 다음과 같다.

1. 표지
2. 사주 한 줄 정의
3. 당신은 어떤 사람인가
4. 사주를 구성하는 기본 만세력
5. 나를 돕는 귀인 (용신) vs 나를 막는 방해꾼 (기신)
6. 목차

`{변수명}`은 서버에서 받는 값이다. 이거 내가 일일이 지정하기 힘드니까 보고서 알아서 변수명 만들어주고 옆에 // 변수명 설명 주석까지 작성 필요.

### 1. 표지

```
The Autehtic Destiny Report
{유저네임}님 정통사주풀이
```

### 2. 사주 한 줄 정의

```
{유저네임}님의 사주 한 줄 정의
"{사주 한 줄 정의}"
--------
{유저네임}님의 핵심 키워드

{핵심키워드1}
{핵심키워드2}
{핵심키워드3}

--------
{유저네임}님의 {현재년도}년
{현재년도}년은 미루면 손해가 되는 해입니다.
```

### 3.당신은 어떤 사람인가

```
2.
당신은 어떤 사람인가

2-1 타고난 성향과 기질
{타고난 성향과 기질 설명}

2-2 강점이 발휘되고, 약해지는 순간
{강점이 발휘되고, 약해지는 순간 설명}
```

### 4.사주를 구성하는 기본 만세력

```
{유저네임}님의 사주를 구성하는 기본 만세력

이미지     이미지


나는 어떤 사람일까?
{나는 어떤 사람}

나의 재물과 직업은?
{나의 재물과 직업}

나의 타고난 성향은?
{나의 타고난 성향}

나의 이성관계는?
{나의 이성관계}

나의 인생은 어떻게 흘러갈까?
{나의 인생}

나에게 지금 필요한 것은?
{나에게 지금 필요한 것}

```

### 5.나를 돕는 귀인(용신) vs 나를 막는 방해꾼(기신)

```
나를 돕는 귀인(용신) vs 나를 막는 방해꾼(기신)
용신(用神)은 내 사주의 균형을 맞춰주는 ‘약’과 같은 기운이고,
기신(忌神)은 균형을 깨뜨리는 ‘독'과 같은 기운입니다.

{유저네임}님에게 가장 필요한 기운은 '{필요한기운}'입니다.
반면, 피해야 할 기운은 '{피해야할기운}'입니다.

5행 이미지

이걸 가까이 하면 운이 살아납니다.

행운의 색({행운의 색})
{행운의 색 설명}

방향({행운의 방향})
{행운의 방향 설명}

숫자({행운의 숫자})
{행운의 숫자 설명}

이건 기운을 빼앗으니 주의하세요.

피해야 할 색({피해야 할 색})
{피해야 할 색 설명}

음식({피해야할 음식})
{피해야할 음식}


```

### 6.목차

- 목차는 나중에 구성.

```

```
