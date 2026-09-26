import { createContext, useContext, useState } from "react";
import { runStage } from "../api/brandApi.js";
import { STAGE_KEYS, nextStageKey } from "../lib/stages.js";

const BrandContext = createContext(null);

export function BrandProvider({ children }) {
  const [brand, setBrand] = useState({ id: null, brief: "", stageOutputs: {} });
  const [activeStage, setActiveStage] = useState(STAGE_KEYS[0]);
  const [pendingStage, setPendingStage] = useState(null);
  const [stageErrors, setStageErrors] = useState({});

  // The Understand stage takes the user's free-text brief directly.
  async function submitBrief(brief) {
    setPendingStage("understand");
    setStageErrors((current) => ({ ...current, understand: null }));
    try {
      const result = await runStage("understand", { brief });
      setBrand((current) => ({
        ...current,
        brief,
        stageOutputs: { ...current.stageOutputs, understand: result },
      }));
      setActiveStage(nextStageKey("understand"));
      return result;
    } catch (error) {
      setStageErrors((current) => ({ ...current, understand: describeError(error) }));
      throw error;
    } finally {
      setPendingStage(null);
    }
  }

  // Every later stage reads the brief plus everything decided so far —
  // that accumulated context is the thing that makes this a pipeline,
  // not six disconnected prompts.
  async function runStageAndAdvance(stageKey) {
    setPendingStage(stageKey);
    setStageErrors((current) => ({ ...current, [stageKey]: null }));
    try {
      const result = await runStage(stageKey, {
        brief: brand.brief,
        context: brand.stageOutputs,
      });
      setBrand((current) => ({
        ...current,
        stageOutputs: { ...current.stageOutputs, [stageKey]: result },
      }));
      const next = nextStageKey(stageKey);
      if (next) setActiveStage(next);
      return result;
    } catch (error) {
      setStageErrors((current) => ({ ...current, [stageKey]: describeError(error) }));
      throw error;
    } finally {
      setPendingStage(null);
    }
  }

  function goToStage(stageKey) {
    setActiveStage(stageKey);
  }

  return (
    <BrandContext.Provider
      value={{
        brand,
        activeStage,
        pendingStage,
        stageErrors,
        submitBrief,
        runStageAndAdvance,
        goToStage,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}

function describeError(error) {
  if (error?.response?.status === 501) {
    return "This stage isn't wired up on the server yet.";
  }
  if (error?.response?.data?.error) return error.response.data.error;
  return "Something went wrong reaching the server. Check that it's running and try again.";
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (!context) throw new Error("useBrand must be used inside BrandProvider");
  return context;
}