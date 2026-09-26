import { useBrand } from "../context/BrandContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
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
    <div className="flex min-h-screen bg-ink">
      <Sidebar />

      <div className="flex-1">
        <ProgressStepper
          currentStage={activeStage}
          completedStages={completedStages}
          onSelect={goToStage}
        />
        <hr className="border-paper/10" />

        <div className="mx-auto max-w-3xl px-6 py-10 md:px-10">
          {activeStage === "understand" && <DiscoverForm />}

          {activeStage === "position" && (
            <StagePanel stageKey="position">
              {(output) => <PositionCard position={output} />}
            </StagePanel>
          )}

          {activeStage === "shape" && (
            <StagePanel stageKey="shape">
              {(output) => <PersonalityBoard {...output} />}
            </StagePanel>
          )}

          {activeStage === "visualize" && (
            <StagePanel stageKey="visualize">
              {(output) => <VisualDirection direction={output} />}
            </StagePanel>
          )}

          {activeStage === "challenge" && (
            <StagePanel stageKey="challenge">
              {(output) => <ConsistencyChecker {...output} />}
            </StagePanel>
          )}

          {activeStage === "deliver" && (
            <StagePanel stageKey="deliver">
              {(output) => <BrandKitExport brandKit={output} />}
            </StagePanel>
          )}
        </div>
      </div>
    </div>
  );
}