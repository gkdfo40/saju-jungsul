import type { ReactNode } from "react";
import type { PageProps } from "@react-pdf/renderer";
import { Image, Page, View } from "@react-pdf/renderer";

import { DESTINY_REPORT_ASSETS, reportStyles } from "./styles";

export type ReportPageLayoutProps = {
  /** 배경 이미지 경로 (기본값: cover 배경) */
  backgroundSrc?: string;

  /** `Page`의 bookmark (PDF 사이드바 목차용) */
  bookmark?: string;

  /** 컨텐츠 */
  children: ReactNode;

  /** 하단 푸터 영역을 렌더링할지 여부 */
  renderFooter?: ReactNode;

  /** Page props passthrough */
  size?: PageProps["size"];
  orientation?: PageProps["orientation"];
};

/**
 * 공통 배경 레이아웃
 *
 * Page
 *  - View (bgLayer, fixed)
 *    - Image (background)
 *  - View (content)
 *    - children
 *  - (optional) footer
 */
export function ReportPageLayout({
  backgroundSrc = DESTINY_REPORT_ASSETS.coverBackground,
  bookmark,
  children,
  renderFooter,
  size = "A4",
  orientation,
}: ReportPageLayoutProps) {
  return (
    <Page
      size={size}
      orientation={orientation}
      style={reportStyles.page}
      bookmark={bookmark}
    >
      <View style={reportStyles.bgLayer} fixed>
        <Image src={backgroundSrc} style={reportStyles.bgImage} />
      </View>

      <View style={reportStyles.content}>{children}</View>

      {renderFooter}
    </Page>
  );
}

