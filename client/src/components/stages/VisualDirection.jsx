import { useBrand } from '../../context/BrandContext.jsx';

export default function VisualDirection() {
  const { stageOutputs, advanceStage, loading, error } = useBrand();
  const visual = stageOutputs.visualize;

  async function handleContinue() {
    try {
      await advanceStage('visualize');
    } catch {
      // handled via context
    }
  }

  return (
    <section aria-label="Visual direction" className="space-y-3">
      <h2 className="text-lg font-semibold">Visualize</h2>
      {visual ? (
        <div className="space-y-2">
          <p><strong>Typography:</strong> {visual.typography}</p>
          <div className="flex flex-wrap gap-3">
            {visual.colorMood.map((c) => (
              <div key={c.hex} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border" style={{ backgroundColor: c.hex }} />
                <span>{c.name} ({c.hex}) — {c.why}</span>
              </div>
            ))}
          </div>
          <p><strong>Imagery:</strong> {visual.imageryDirection}</p>
        </div>
      ) : (
        <>
          <p>Ready to translate the strategy into a visual direction.</p>
          {error && <p role="alert" className="text-red-600">{error}</p>}
          <button type="button" onClick={handleContinue} disabled={loading} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">
            {loading ? 'Working…' : 'Run Visualize stage'}
          </button>
        </>
      )}
    </section>
  );
}