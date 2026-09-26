import { createContext, useContext, useState } from 'react';
import { runStage } from '../api/brandApi.js';

const STAGE_ORDER = ['understand', 'position', 'shape', 'visualize', 'challenge', 'deliver'];

const BrandContext = createContext(null);

export function BrandProvider({ children }) {
  const [brief, setBrief] = useState('');
  const [stageOutputs, setStageOutputs] = useState({});
  const [activeStage, setActiveStage] = useState('understand');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function buildContext() {
    return { brief, ...stageOutputs };
  }

  async function runNextStage(stageName, payload) {
    setLoading(true);
    setError('');
    try {
      const result = await runStage(stageName, payload);
      setStageOutputs((current) => ({ ...current, [stageName]: result }));
      const nextIndex = STAGE_ORDER.indexOf(stageName) + 1;
      if (nextIndex < STAGE_ORDER.length) {
        setActiveStage(STAGE_ORDER[nextIndex]);
      }
      return result;
    } catch (err) {
      setError(err?.response?.data?.error || 'That stage failed. Check the API server and try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function submitBrief(value) {
    setBrief(value);
    return runNextStage('understand', { brief: value });
  }

  async function advanceStage(stageName) {
    return runNextStage(stageName, { context: buildContext() });
  }

  function goToStage(stageName) {
    if (stageOutputs[stageName] || stageName === activeStage) {
      setActiveStage(stageName);
    }
  }

  return (
    <BrandContext.Provider
      value={{ brief, stageOutputs, activeStage, loading, error, submitBrief, advanceStage, goToStage, stageOrder: STAGE_ORDER }}
    >
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (!context) throw new Error('useBrand must be used inside BrandProvider');
  return context;
}