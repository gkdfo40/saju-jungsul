import { Text, View } from "@react-pdf/renderer";

import { reportStyles } from "./styles";

export function ReportFooter() {
  return (
    <View style={reportStyles.footer} fixed>
      <View style={reportStyles.footerLine} />
      <Text
        style={reportStyles.footerText}
        render={({ pageNumber }) => `${pageNumber}`}
      />
    </View>
  );
}

