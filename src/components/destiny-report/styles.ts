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
    paddingHorizontal: 30,
    paddingVertical: 30,
  },

  // Typography tokens (page-description.md 기반)
  display1: {
    fontSize: 50,
    lineHeight: 70,
    fontWeight: 400,
    textAlign: "center",
  },
  display2: {
    fontSize: 40,
    lineHeight: 56,
    fontWeight: 400,
    textAlign: "center",
    marginBottom: 8,
  },
  heading0: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: 900,
  },
  heading1: {
    fontSize: 24,
    lineHeight: 34,
    fontWeight: 900,
  },
  heading2: {
    fontSize: 22,
    lineHeight: 31,
    fontWeight: 900,
  },
  title0: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 900,
  },
  title1: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 900,
  },
  title2: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 900,
  },
  body1: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: 900,
    color: "#34302C",
  },
  body2: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 400,
    color: "#34302C",
  },
  label1: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: 400,
    color: "#34302C",
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
