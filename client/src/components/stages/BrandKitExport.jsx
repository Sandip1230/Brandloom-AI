import { useBrand } from '../../context/BrandContext.jsx';

export default function BrandKitExport() {
  const { stageOutputs, advanceStage, loading, error } = useBrand();
  const deliver = stageOutputs.deliver;

  async function handleContinue() {
    try {
      await advanceStage('deliver');
    } catch {
      // handled via context
    }
  }

  function downloadKit() {
    const file = new Blob([JSON.stringify(deliver.brandKit, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'brand-kit.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section aria-label="Brand kit export" className="space-y-3">
      <h2 className="text-lg font-semibold">Deliver</h2>
      {deliver ? (
        <div className="space-y-2">
          <p><strong>Headline:</strong> {deliver.headline}</p>
          <p><strong>Pitch:</strong> {deliver.pitch}</p>
          <p><strong>Social caption:</strong> {deliver.socialCaption}</p>
          {deliver.consistencyNotes.length > 0 && (
            <div>
              <strong>Open consistency notes:</strong>
              <ul className="list-disc pl-5">
                {deliver.consistencyNotes.map((note, index) => <li key={index}>{note}</li>)}
              </ul>
            </div>
          )}
          <button type="button" onClick={downloadKit} className="px-4 py-2 rounded bg-black text-white">
            Download brand kit JSON
          </button>
        </div>
      ) : (
        <>
          <p>Ready to assemble the final, exportable brand kit.</p>
          {error && <p role="alert" className="text-red-600">{error}</p>}
          <button type="button" onClick={handleContinue} disabled={loading} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">
            {loading ? 'Working…' : 'Run Deliver stage'}
          </button>
        </>
      )}
    </section>
  );
}