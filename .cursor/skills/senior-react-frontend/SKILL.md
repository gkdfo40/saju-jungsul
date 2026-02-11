---
name: senior-react-frontend
description: Enforces maintainable, type-safe, accessible frontend changes in React + TypeScript + Vite projects using Tailwind, shadcn-ui/Radix, and react-hook-form + zod. Use when implementing or refactoring UI, routes, forms, services, and shared types, or when the user mentions shadcn, Radix, Tailwind, react-hook-form, zod, Vite, or folder structure conventions.
---

# Senior React Frontend (Project Standards)

이 스킬은 이 레포의 프론트엔드 작업에서 **일관된 아키텍처/타입/접근성/폼 패턴**을 강제한다.

## Quick start (항상 적용)

- **폴더 구조 고수**: `src/routes`, `src/service`, `src/types`, `src/components`, `src/lib` 밖으로 새 패턴/새 레이어를 만들지 않는다.
- **기능 컴포넌트만**: class component 금지.
- **타입 안정성**: `any` 금지. 불가피하면 `unknown` + 타입가드.
- **접근성 필수**: label/aria/키보드 동작이 없는 인터랙션 UI는 출고 금지.
- **단순한 정답 우선**: 여러 해법이면 가장 단순하고 올바른 해법을 선택한다.
- **프로젝트 일관성 우선**: 베스트프랙티스와 충돌 시, 특별 지시가 없으면 기존 프로젝트 패턴에 맞춘다.

## Architecture & Project Consistency

- **새 아키텍처 금지**: 상태관리/데이터레이어/라우팅 패턴을 새로 도입하지 않는다(명시적 지시가 있을 때만).
- **과한 추상화 금지**: 과도한 제네릭/유틸 레이어/프레임워크화(“공용 컴포넌트 공장”)를 피한다.
- **상태는 로컬 우선**: 전역 상태는 명확한 정당성 없이 추가하지 않는다.

## Naming & Imports

- **파일/컴포넌트 네이밍**
  - 컴포넌트/페이지: `PascalCase.tsx`
  - 훅: `useSomething.ts`
  - 유틸: `camelCase.ts`
  - 타입/인터페이스: `PascalCase`
  - 라우트 파일: 프로젝트 관례(예: `kebab-case.tsx`)를 우선한다.
- **import 순서**
  1) 외부 라이브러리
  2) 내부 alias import (예: `@/components`, `@/lib`)
  3) 상대 경로 import
  4) 스타일/side-effect import

## React + TypeScript

- **명시적 타입**: API 응답/요청, 컴포넌트 props, 콜백 시그니처는 명확히 타입을 둔다(가독성이 좋아질 때).
- **과도한 제네릭 회피**: “똑똑한” 추상화보다 읽기 쉬운 코드.
- **에러/빈 상태**: 로딩/에러/빈 상태를 명확히 렌더링한다.

## UI (shadcn-ui / Radix) & Tailwind

- **기본은 shadcn-ui**: 가능한 경우 shadcn-ui 컴포넌트를 우선 사용한다.
- **Radix 직접 사용 시**: shadcn 스타일/구조 패턴을 그대로 따른다(클래스, 슬롯, 포커스 링 등).
- **Tailwind 중복 최소화**: 반복되는 클래스는 컴포넌트/variant로 추출한다.
- **접근성 체크리스트**
  - **폼 필드**: `label` ↔ `id` 연결 또는 적절한 `aria-label`/`aria-labelledby`
  - **Dialog/Popover/Dropdown**: 포커스 트랩/ESC 닫기/키보드 탐색 보장
  - **아이콘 버튼**: 시각 텍스트가 없으면 `aria-label` 필수

## Forms (Critical): react-hook-form + zod

- **모든 폼은 RHF + zod**로 구현한다.
- **zod가 단일 진실**: UI에서 임의 검증 로직을 추가하지 않는다(명시적 요구가 있을 때만).
- **스키마는 컴포넌트 밖**: `src/types`, `src/lib`, 또는 기능 도메인 모듈에 둔다.
- **필수 패턴**
  - `zodResolver(schema)`
  - 초기값은 `defaultValues`
  - 에러는 shadcn `FormMessage`(또는 프로젝트와 동일한 패턴)로 표시
- **Controller는 필요할 때만**: 기본 입력은 `register` 기반, 복잡한 제3자 입력만 `Controller`.

## Data & Service Layer

- **Route에서 fetch/axios 금지**: 네트워크 호출은 반드시 `src/service`로.
- **service 책임**: 엔드포인트 호출 + request/response 타입 + 일관된 에러 형태(가능하면).
- **UI 변환은 route/domain**: 서비스에서 UI 전용 포맷팅/매핑 로직을 하지 않는다.

## Decision Rules (불확실성 처리)

- 요구사항이 모호하면:
  - **가정(assumptions)을 명시적으로 표기**하고,
  - 가장 보수적(기존 코드와 일관)인 방향으로 진행한다.

## Forbidden

- 사용자 지시 없이 **새 라이브러리 추가**
- 폴더 구조 무시
- RHF+zod 없는 폼 로직
- 정당성 없는 전역 상태 추가
- 매직 스트링/미타입 API 응답 방치

## Output expectations

- 프로덕션 품질(타입/에러 처리/접근성)로 작성한다.
- 미들급 개발자가 읽기 쉬운 코드로 유지한다.
