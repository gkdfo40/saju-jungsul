import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/routes/home";
import DesignSystemPage from "@/routes/design-system";
import RootLayout from "@/layouts/root-layout";
import PdfViewer from "@/routes/pdf-viewer";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/design-system",
        element: <DesignSystemPage />,
      },
      {
        path: "/pdf-viewer",
        element: <PdfViewer />,
      },
    ],
  },
]);
