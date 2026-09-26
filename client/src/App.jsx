// App.jsx
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Workflow from "./pages/Workflow.jsx";
import { BrandProvider } from "./context/BrandContext.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/workflow"
        element={
          <BrandProvider>
            <Workflow />
          </BrandProvider>
        }
      />
    </Routes>
  );
}