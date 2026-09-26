import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { useRef } from "react";
import Landing from "./pages/Landing.jsx";
import Workflow from "./pages/Workflow.jsx";
import Projects from "./pages/Projects.jsx";
import BrandKits from "./pages/BrandKits.jsx";
import Templates from "./pages/Templates.jsx";
import Community from "./pages/Community.jsx";
import { BrandProvider } from "./context/BrandContext.jsx";
import { createProjectId } from "./lib/projectsStore.js";

function WorkflowRoute() {
  const { projectId } = useParams();
  // key={projectId} forces a fresh BrandProvider (and fresh state) whenever
  // the URL switches to a different project, instead of reusing stale state.
  return (
    <BrandProvider key={projectId} projectId={projectId}>
      <Workflow />
    </BrandProvider>
  );
}

function NewWorkflowRedirect() {
  const idRef = useRef(createProjectId());
  return <Navigate to={`/workflow/${idRef.current}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/brand-kits" element={<BrandKits />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/community" element={<Community />} />
      <Route path="/workflow" element={<NewWorkflowRedirect />} />
      <Route path="/workflow/:projectId" element={<WorkflowRoute />} />
    </Routes>
  );
}