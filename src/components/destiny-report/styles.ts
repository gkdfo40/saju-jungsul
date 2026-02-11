import { StyleSheet } from "@react-pdf/renderer";

export const DESTINY_REPORT_ASSETS = {
  coverBackground: "/images/cover_bg_img 1.png",
  bodyBackground: "/images/body_bg_img 1.png",
} as const;

export const reportStyles = StyleSheet.create({
  page: {
    fontFamily: "GowunDodum",
    position: "relative",
  },
  bgLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },

  content: {
    paddingTop: 48,
    paddingBottom: 72,
    paddingHorizontal: 40,
  },

  // Typography (프로젝트 CSS 토큰을 PDF에 직접 쓸 수 없으므로 근사값 사용)
  displayTitle: {
    fontSize: 28,
    fontWeight: 700,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  heading: {
    fontSize: 20,
    fontWeight: 700,
    color: "#2B3933",
    marginBottom: 12,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: 700,
    color: "#465D51",
    marginTop: 10,
    marginBottom: 6,
  },
  body: {
    fontSize: 12,
    lineHeight: 1.6,
    color: "#34302C",
  },
  quote: {
    fontSize: 12,
    lineHeight: 1.7,
    color: "#1E2723",
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 12,
  },

  card: {
    backgroundColor: "rgba(243, 239, 229, 0.75)", // --color-water 근사
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(69, 64, 57, 0.25)", // --color-secondary-600 근사
    marginVertical: 14,
  },

  // Placeholder 이미지
  imageRow: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 12,
  },
  imageBox: {
    flexGrow: 1,
    height: 120,
    borderRadius: 8,
    backgroundColor: "rgba(219, 217, 213, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  imageLabel: {
    fontSize: 10,
    color: "rgba(69, 64, 57, 0.85)",
  },

  footer: {
    position: "absolute",
    left: 28,
    right: 28,
    bottom: 20,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  footerLine: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(142, 144, 177, 0.6)", // --color-gray-blue 근사
  },
  footerText: {
    fontSize: 10,
    color: "rgba(69, 64, 57, 0.85)",
    fontWeight: 700,
    textAlign: "center",
  },
});

