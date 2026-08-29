import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Architecture } from "./pages/Architecture";
import { Installation } from "./pages/Installation";
import { ExecutionEngine } from "./pages/ExecutionEngine";
import { PrimitivesStrings } from "./pages/PrimitivesStrings";
import { NumericBigInt } from "./pages/NumbersBigInt";
import { ObjectsPolicies } from "./pages/ObjectsPolicies";
import { Collections } from "./pages/Collections";
import { FileUploads } from "./pages/FileUploads";
import { CombinatorsSpecials } from "./pages/CombinatorsSpecials";
import { ModifiersPipelines } from "./pages/ModifiersPipelines";
import { CoercionErrors } from "./pages/CoercionErrors";
import { TypeInference } from "./pages/TypeInference";
import { ThemeProvider } from "./context/ThemeContext";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Architecture /> },
      { path: "installation", element: <Installation /> },
      { path: "execution-engine", element: <ExecutionEngine /> },
      { path: "primitives-strings", element: <PrimitivesStrings /> },
      { path: "numeric-bigint", element: <NumericBigInt /> },
      { path: "objects-policies", element: <ObjectsPolicies /> },
      { path: "collections", element: <Collections /> },
      { path: "file-uploads", element: <FileUploads /> },
      { path: "combinators-specials", element: <CombinatorsSpecials /> },
      { path: "modifiers-pipelines", element: <ModifiersPipelines /> },
      { path: "coercion-errors", element: <CoercionErrors /> },
      { path: "type-inference", element: <TypeInference /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}