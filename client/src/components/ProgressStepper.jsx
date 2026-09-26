const stages = ['Understand', 'Position', 'Shape', 'Visualize', 'Challenge', 'Deliver'];

export default function ProgressStepper({ currentStage = 'understand' }) {
  const activeIndex = stages.findIndex((stage) => stage.toLowerCase() === currentStage);

  return (
    <ol aria-label="Brand pipeline progress">
      {stages.map((stage, index) => (
        <li key={stage} aria-current={index === activeIndex ? 'step' : undefined}>
          <span>{index + 1}</span> {stage}
        </li>
      ))}
    </ol>
  );
}