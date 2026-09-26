import { Link } from "react-router-dom";
import { useBrand } from "../context/BrandContext.jsx";
import ProgressStepper from "../components/ProgressStepper.jsx";
import StagePanel from "../components/StagePanel.jsx";
import DiscoverForm from "../components/stages/DiscoverForm.jsx";
import PositionCard from "../components/stages/PositionCard.jsx";
import PersonalityBoard from "../components/stages/PersonalityBoard.jsx";
import VisualDirection from "../components/stages/VisualDirection.jsx";
import ConsistencyChecker from "../components/stages/ConsistencyChecker.jsx";
import BrandKitExport from "../components/stages/BrandKitExport.jsx";
import { STAGES } from "../lib/stages.js";

export default function Workflow() {
  const { brand, activeStage, goToStage } = useBrand();
  const completedStages = Object.keys(brand.stageOutputs);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 md:px-10">
        <Link to="/" className="font-display text-xl tracking-tight">
          Brandloom
        </Link>
        <span className="text-sm text-ink-soft">Your brand workspace</span>
      </header>

      <ProgressStepper
        currentStage={activeStage}
        completedStages={completedStages}
        onSelect={goToStage}
      />

      <hr className="mx-auto max-w-6xl border-ink/10" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 py-12 md:grid-cols-[1.3fr_1fr] md:px-10">
        {/* Current stage — input or results, depending which one is active */}
        <div>
          {activeStage === "understand" && <DiscoverForm />}

          {activeStage === "position" && (
            <StagePanel stageKey="position">
              {(output) => <PositionCard position={output} />}
            </StagePanel>
          )}

          {activeStage === "shape" && (
            <StagePanel stageKey="shape">
              {(output) => <PersonalityBoard traits={output?.traits} />}
            </StagePanel>
          )}

          {activeStage === "visualize" && (
            <StagePanel stageKey="visualize">
              {(output) => <VisualDirection direction={output} />}
            </StagePanel>
          )}

          {activeStage === "challenge" && (
            <StagePanel stageKey="challenge">
              {(output) => <ConsistencyChecker findings={output?.findings} />}
            </StagePanel>
          )}

          {activeStage === "deliver" && (
            <StagePanel stageKey="deliver">
              {(output) => <BrandKitExport brandKit={output} />}
            </StagePanel>
          )}
        </div>

        {/* The thread so far — what each earlier stage decided, carried forward as context */}
        <aside>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
            The thread so far
          </span>
          <ol className="mt-4 space-y-4">
            {STAGES.map((stage, index) => {
              const output = brand.stageOutputs[stage.key];
              const isActive = stage.key === activeStage;
              return (
                <li
                  key={stage.key}
                  className={"border-t pt-3 " + (isActive ? "border-gold" : "border-ink/10")}
                >
                  <div className="flex items-baseline justify-between">
                    <span className={"text-sm " + (isActive ? "text-ink" : "text-ink-soft")}>
                      {String(index + 1).padStart(2, "0")} {stage.label}
                    </span>
                    {output && <span className="text-xs text-gold">done</span>}
                  </div>
                  {!output && (
                    <p className="mt-1 text-xs text-ink-soft/70">Not started yet.</p>
                  )}
                </li>
              );
            })}
          </ol>
        </aside>
      </div>
    </div>
  );
}