import { lazy, Suspense } from "react";

const PDFContent = lazy(() => import("@/routes/pdf-viewer/pdf-content"));

export default function PdfViewerPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-gray-100">
      <Suspense
        fallback={<p className="text-muted-foreground">PDF를 불러오는 중...</p>}
      >
        <PDFContent />
      </Suspense>
    </div>
  );
}
