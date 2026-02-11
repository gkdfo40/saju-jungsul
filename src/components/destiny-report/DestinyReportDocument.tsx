import { memo } from "react";
import { Document } from "@react-pdf/renderer";

import { CoverPage } from "./CoverPage";
import { ensureDestinyReportFonts } from "./font";
import type { DestinyReportData } from "./types";

export type DestinyReportDocumentProps = {
  data: DestinyReportData;
};

function DestinyReportDocumentInner({ data }: DestinyReportDocumentProps) {
  ensureDestinyReportFonts();

  return (
    <Document
      title="정통사주 리포트"
      author="saju-jungsul"
      subject="Destiny report"
      creator="@react-pdf/renderer"
    >
      {/* 1. 표지 (푸터 없음) */}
      <CoverPage userName={data.userName} />
    </Document>
  );
}

export const DestinyReportDocument = memo(DestinyReportDocumentInner);

