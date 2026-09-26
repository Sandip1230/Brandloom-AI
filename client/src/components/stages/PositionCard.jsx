import { useBrand } from '../../context/BrandContext.jsx';

export default function PositionCard() {
  const { stageOutputs, advanceStage, loading, error } = useBrand();
  const position = stageOutputs.position;

  async function handleContinue() {
    try {
      await advanceStage('position');
    } catch {
      // handled via context
    }
  }

  return (
    <section aria-label="Brand position" className="space-y-3">
      <h2 className="text-lg font-semibold">Position</h2>
      {position ? (
        <div className="space-y-1">
          <p><strong>Category:</strong> {position.category}</p>
          <p><strong>Differentiator:</strong> {position.differentiator}</p>
          <p><strong>Value proposition:</strong> {position.valueProposition}</p>
        </div>
      ) : (
        <>
          <p>Ready to define how this brand stands apart.</p>
          {error && <p role="alert" className="text-red-600">{error}</p>}
          <button type="button" onClick={handleContinue} disabled={loading} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">
            {loading ? 'Working…' : 'Run Position stage'}
          </button>
        </>
      )}
    </section>
  );
}