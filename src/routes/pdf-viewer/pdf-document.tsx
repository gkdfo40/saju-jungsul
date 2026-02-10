import { memo } from "react";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// 한글: 고운돋움 로컬 (WOFF2 — 444KB, WOFF 대비 1/3 크기)
Font.register({
  family: "GowunDodum",
  src: "/fonts/GowunDodum-Regular.woff",
  fontWeight: 400,
});

/* ── 챕터 데이터 ───────────────────────────────── */
const chapters = [
  {
    id: "ch1",
    title: "1장. React-pdf 소개",
    body: "이 PDF는 react-pdf.org 공식 라이브러리인 @react-pdf/renderer로 생성되었습니다. Document, Page, View, Text, StyleSheet 컴포넌트를 사용해 브라우저·서버에서 PDF를 만들 수 있습니다. PDFViewer로 화면에 보여주거나, PDFDownloadLink로 다운로드, BlobProvider로 blob을 다루는 등 다양한 방식으로 사용할 수 있습니다.",
  },
  {
    id: "ch2",
    title: "2장. 컴포넌트 구성",
    body: "Document 아래에는 여러 Page를 넣을 수 있습니다. 각 Page에 View, Text, Image, Link 등을 조합해 레이아웃을 구성합니다. 스타일은 StyleSheet.create()로 정의하며, React Native와 유사한 스타일 API를 사용합니다.",
  },
  {
    id: "ch3",
    title: "3장. 스타일링",
    body: "Flexbox 기반의 레이아웃 시스템을 제공합니다. flexDirection, justifyContent, alignItems 등 익숙한 속성을 사용할 수 있으며, padding, margin, border, backgroundColor 등으로 박스 스타일링이 가능합니다. 단위는 pt(포인트)를 기본으로 사용합니다.",
  },
  {
    id: "ch4",
    title: "4장. 폰트 관리",
    body: "Font.register()로 커스텀 폰트를 등록할 수 있습니다. TTF, WOFF, WOFF2 형식을 지원하며, src에 URL이나 로컬 경로를 지정합니다. 한글 폰트는 글리프 수가 많아 파일 크기가 크므로, 서브셋 폰트를 사용하면 성능을 크게 개선할 수 있습니다.",
  },
  {
    id: "ch5",
    title: "5장. 고급 기능",
    body: "페이지 번호, 북마크, 내부 링크, 동적 렌더링(render prop) 등의 고급 기능을 제공합니다. render prop을 사용하면 페이지 번호나 총 페이지 수 같은 동적 값을 텍스트에 삽입할 수 있습니다. bookmark prop으로 PDF 사이드바 목차도 생성 가능합니다.",
  },
];

/* ── 스타일 ─────────────────────────────────────── */
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 40,
    fontFamily: "GowunDodum",
  },
  tocTitle: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: 700,
  },
  tocItem: {
    fontSize: 14,
    marginBottom: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    color: "#1a5276",
    textDecoration: "none",
  },
  chapterTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 700,
    color: "#1a5276",
  },
  section: {
    marginVertical: 10,
    padding: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 1.8,
    textAlign: "justify",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "grey",
  },
});

/* ── 페이지 푸터 ─────────────────────────────────── */
function PageFooter() {
  return (
    <Text
      style={styles.footer}
      fixed
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
  );
}

/* ── 문서 ─────────────────────────────────────────── */
function SampleDocumentInner() {
  return (
    <Document
      title="React-pdf 샘플"
      author="Vite + React"
      subject="@react-pdf/renderer 공식 가이드"
      creator="react-pdf"
    >
      {/* ▸ 목차 페이지 */}
      <Page size="A4" style={styles.page} bookmark="목차">
        <Text style={styles.tocTitle}>목차</Text>
        {chapters.map((ch, i) => (
          <Link key={ch.id} src={`#${ch.id}`} style={styles.tocItem}>
            {`${i + 1}.  ${ch.title}`}
          </Link>
        ))}
        <PageFooter />
      </Page>

      {/* ▸ 본문 페이지 */}
      {chapters.map((ch) => (
        <Page key={ch.id} size="A4" style={styles.page} bookmark={ch.title}>
          <View id={ch.id} style={styles.section}>
            <Text style={styles.chapterTitle}>{ch.title}</Text>
            <Text style={styles.text}>{ch.body}</Text>
          </View>
          <PageFooter />
        </Page>
      ))}
    </Document>
  );
}

export const SampleDocument = memo(SampleDocumentInner);
