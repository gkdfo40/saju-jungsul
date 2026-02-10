import { PDFViewer } from "@react-pdf/renderer";
import { SampleDocument } from "./pdf-document";

export default function PDFContent() {
  return (
    <PDFViewer width="100%" height="100%" style={{ minHeight: "100vh" }}>
      <SampleDocument />
    </PDFViewer>
  );
}
