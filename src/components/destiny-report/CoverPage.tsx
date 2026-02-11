import { Text } from "@react-pdf/renderer";

import { ReportPageLayout } from "./ReportPageLayout";
import { DESTINY_REPORT_ASSETS, reportStyles } from "./styles";

export type CoverPageProps = {
  /** {유저네임}: 표지에 노출되는 사용자 이름 */
  userName: string;
};

export function CoverPage({ userName }: CoverPageProps) {
  return (
    <ReportPageLayout
      backgroundSrc={DESTINY_REPORT_ASSETS.coverBackground}
      bookmark="표지"
    >
      <Text style={reportStyles.display2}>The Autehtic Destiny Report</Text>
      <Text style={reportStyles.heading1}>{userName}님</Text>
      <Text style={reportStyles.heading1}>정통사주풀이</Text>
    </ReportPageLayout>
  );
}
