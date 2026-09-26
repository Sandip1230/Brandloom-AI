import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { useRef } from "react";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Workflow from "./pages/Workflow.jsx";
import Projects from "./pages/Projects.jsx";
import BrandKits from "./pages/BrandKits.jsx";
import Templates from "./pages/Templates.jsx";
import Community from "./pages/Community.jsx";
import { BrandProvider } from "./context/BrandContext.jsx";
import { createProjectId } from "./lib/projectsStore.js";

function WorkflowRoute() {
  const { projectId } = useParams();
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
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/brand-kits" element={<BrandKits />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/community" element={<Community />} />
      <Route path="/workflow" element={<NewWorkflowRedirect />} />
      <Route path="/workflow/:projectId" element={<WorkflowRoute />} />
    </Routes>
  );
}