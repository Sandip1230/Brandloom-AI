import { useBrand } from '../context/BrandContext.jsx';

const LABELS = {
  understand: 'Understand',
  position: 'Position',
  shape: 'Shape',
  visualize: 'Visualize',
  challenge: 'Challenge',
  deliver: 'Deliver',
};

export default function ProgressStepper() {
  const { stageOrder, activeStage, stageOutputs, goToStage } = useBrand();
  const activeIndex = stageOrder.indexOf(activeStage);

  return (
    <ol aria-label="Brand pipeline progress" className="flex flex-wrap gap-2 text-sm">
      {stageOrder.map((stage, index) => {
        const done = Boolean(stageOutputs[stage]);
        const isActive = index === activeIndex;
        return (
          <li key={stage}>
            <button
              type="button"
              onClick={() => goToStage(stage)}
              disabled={!done && !isActive}
              aria-current={isActive ? 'step' : undefined}
              className={`px-3 py-1 rounded-full border ${
                isActive ? 'bg-black text-white' : done ? 'bg-gray-100' : 'opacity-40 cursor-not-allowed'
              }`}
            >
              {index + 1}. {LABELS[stage]}
            </button>
          </li>
        );
      })}
    </ol>
  );
}