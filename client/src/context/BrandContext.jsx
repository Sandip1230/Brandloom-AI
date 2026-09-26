import { createContext, useContext, useState } from 'react';
import { runStage } from '../api/brandApi.js';

const BrandContext = createContext(null);

export function BrandProvider({ children }) {
  const [brand, setBrand] = useState({ id: null, brief: '', stageOutputs: {} });
  const [activeStage, setActiveStage] = useState('understand');

  async function submitBrief(brief) {
    const result = await runStage('understand', { brief });
    setBrand((current) => ({ ...current, brief, stageOutputs: { ...current.stageOutputs, understand: result } }));
    return result;
  }

  return (
    <BrandContext.Provider value={{ brand, activeStage, setActiveStage, submitBrief }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (!context) throw new Error('useBrand must be used inside BrandProvider');
  return context;
}