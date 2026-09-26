import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BrandProvider } from './context/BrandContext.jsx';
import Landing from './pages/Landing.jsx';
import Workflow from './pages/Workflow.jsx';

export default function App() {
  return (
    <BrandProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/workflow" element={<Workflow />} />
        </Routes>
      </BrowserRouter>
    </BrandProvider>
  );
}