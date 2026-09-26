import { useBrand } from "../context/BrandContext.jsx";
import AppShell from "../components/AppShell.jsx";
import ProgressStepper from "../components/ProgressStepper.jsx";
import StagePanel from "../components/StagePanel.jsx";
import DiscoverForm from "../components/stages/DiscoverForm.jsx";
import PositionCard from "../components/stages/PositionCard.jsx";
import PersonalityBoard from "../components/stages/PersonalityBoard.jsx";
import VisualDirection from "../components/stages/VisualDirection.jsx";
import ConsistencyChecker from "../components/stages/ConsistencyChecker.jsx";
import BrandKitExport from "../components/stages/BrandKitExport.jsx";

export default function Workflow() {
  const { brand, activeStage, goToStage } = useBrand();
  const completedStages = Object.keys(brand.stageOutputs);

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <ProgressStepper
          currentStage={activeStage}
          completedStages={completedStages}
          onSelect={goToStage}
        />

        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
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
              {(output) => (
                <ConsistencyChecker findings={output?.findings} consistent={output?.consistent} />
              )}
            </StagePanel>
          )}

          {activeStage === "deliver" && (
            <StagePanel stageKey="deliver">
              {(output) => <BrandKitExport brandKit={output} />}
            </StagePanel>
          )}
        </div>
      </div>
    </AppShell>
  );
}