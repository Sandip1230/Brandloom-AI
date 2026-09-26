import { useBrand } from '../context/BrandContext.jsx';
import ProgressStepper from '../components/ProgressStepper.jsx';
import DiscoverForm from '../components/stages/DiscoverForm.jsx';
import PositionCard from '../components/stages/PositionCard.jsx';
import PersonalityBoard from '../components/stages/PersonalityBoard.jsx';
import VisualDirection from '../components/stages/VisualDirection.jsx';
import ConsistencyChecker from '../components/stages/ConsistencyChecker.jsx';
import BrandKitExport from '../components/stages/BrandKitExport.jsx';

const STAGE_COMPONENTS = {
  understand: DiscoverForm,
  position: PositionCard,
  shape: PersonalityBoard,
  visualize: VisualDirection,
  challenge: ConsistencyChecker,
  deliver: BrandKitExport,
};

export default function Workflow() {
  const { activeStage } = useBrand();
  const ActiveComponent = STAGE_COMPONENTS[activeStage];

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <a href="/" className="font-semibold">Brandloom</a>
        <h1 className="text-xl font-bold">Your brand workspace</h1>
      </header>
      <ProgressStepper />
      <ActiveComponent />
    </main>
  );
}