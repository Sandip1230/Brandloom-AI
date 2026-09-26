import { createContext, useContext, useState } from "react";
import { runStage as callStageApi } from "../api/brandApi.js";
import { STAGE_KEYS, nextStageKey, previousStageKey } from "../lib/stages.js";

const BrandContext = createContext(null);

export function BrandProvider({ children }) {
  const [brand, setBrand] = useState({ id: null, brief: "", stageOutputs: {} });
  const [activeStage, setActiveStage] = useState(STAGE_KEYS[0]);
  const [pendingStage, setPendingStage] = useState(null);
  const [stageErrors, setStageErrors] = useState({});

  // The Understand stage takes the user's free-text brief directly.
  // It does NOT auto-advance — the caller shows a confirmation view and
  // the user explicitly continues, same as every later stage.
  async function submitBrief(brief) {
    setPendingStage("understand");
    setStageErrors((current) => ({ ...current, understand: null }));
    try {
      const result = await callStageApi("understand", { brief });
      setBrand((current) => ({
        ...current,
        brief,
        stageOutputs: { ...current.stageOutputs, understand: result },
      }));
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
  // not six disconnected prompts. Does not auto-advance.
  async function runStage(stageKey) {
    setPendingStage(stageKey);
    setStageErrors((current) => ({ ...current, [stageKey]: null }));
    try {
      const result = await callStageApi(stageKey, {
        brief: brand.brief,
        context: brand.stageOutputs,
      });
      setBrand((current) => ({
        ...current,
        stageOutputs: { ...current.stageOutputs, [stageKey]: result },
      }));
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

  function advance(fromStageKey) {
    const next = nextStageKey(fromStageKey);
    if (next) setActiveStage(next);
  }

  function goBack(fromStageKey) {
    const previous = previousStageKey(fromStageKey);
    if (previous) setActiveStage(previous);
  }

  return (
    <BrandContext.Provider
      value={{
        brand,
        activeStage,
        pendingStage,
        stageErrors,
        submitBrief,
        runStage,
        goToStage,
        advance,
        goBack,
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