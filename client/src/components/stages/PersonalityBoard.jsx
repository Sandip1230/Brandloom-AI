import { useBrand } from '../../context/BrandContext.jsx';

export default function PersonalityBoard() {
  const { stageOutputs, advanceStage, loading, error } = useBrand();
  const shape = stageOutputs.shape;

  async function handleContinue() {
    try {
      await advanceStage('shape');
    } catch {
      // handled via context
    }
  }

  return (
    <section aria-label="Brand personality" className="space-y-3">
      <h2 className="text-lg font-semibold">Shape</h2>
      {shape ? (
        <div className="space-y-2">
          <ul className="list-disc pl-5">
            {shape.traits.map((t) => (
              <li key={t.trait}><strong>{t.trait}</strong> — {t.why}</li>
            ))}
          </ul>
          <p><strong>Tagline:</strong> {shape.tagline}</p>
          <p><strong>Voice:</strong> {shape.voice}</p>
          <div>
            <strong>Naming directions:</strong>
            <ul className="list-disc pl-5">
              {shape.namingDirections.map((n) => (
                <li key={n.name}>{n.name} — {n.rationale}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <p>Ready to shape the brand's personality, naming and voice.</p>
          {error && <p role="alert" className="text-red-600">{error}</p>}
          <button type="button" onClick={handleContinue} disabled={loading} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">
            {loading ? 'Working…' : 'Run Shape stage'}
          </button>
        </>
      )}
    </section>
  );
}