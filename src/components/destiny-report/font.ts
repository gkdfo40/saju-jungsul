import { Font } from "@react-pdf/renderer";

let registered = false;

/**
 * react-pdf는 런타임에서 폰트 등록이 필요하다.
 * - HMR/재렌더로 중복 등록되는 것을 피하기 위해 1회만 등록한다.
 */
export function ensureDestinyReportFonts() {
  if (registered) return;
  registered = true;

  // 한글: 고운돋움 로컬
  Font.register({
    family: "GowunDodum",
    src: "/fonts/GowunDodum-Regular.woff",
    fontWeight: 400,
  });
}
