import { useBrand } from '../../context/BrandContext.jsx';

export default function ConsistencyChecker() {
  const { stageOutputs, advanceStage, loading, error } = useBrand();
  const challenge = stageOutputs.challenge;

  async function handleContinue() {
    try {
      await advanceStage('challenge');
    } catch {
      // handled via context
    }
  }

  return (
    <section aria-label="Consistency check" className="space-y-3">
      <h2 className="text-lg font-semibold">Challenge</h2>
      {challenge ? (
        <div className="space-y-3">
          {challenge.findings.map((finding, index) => {
            const alt = challenge.alternatives[index];
            return (
              <div key={`${finding.field}-${index}`} className="border rounded p-3 grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs uppercase text-gray-500">Before — {finding.field} ({finding.severity})</p>
                  <p>{finding.issue}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gray-500">After</p>
                  <p>{alt?.suggestion}</p>
                  <p className="text-sm text-gray-600">{alt?.reasoning}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <p>Ready to stress-test this brand for clichés and contradictions.</p>
          {error && <p role="alert" className="text-red-600">{error}</p>}
          <button type="button" onClick={handleContinue} disabled={loading} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">
            {loading ? 'Working…' : 'Run Challenge stage'}
          </button>
        </>
      )}
    </section>
  );
}