export default function BrandKitExport({ brandKit }) {
  function downloadKit() {
    const file = new Blob([JSON.stringify(brandKit, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "brand-kit.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  const items = ["Summary", "Position", "Personality", "Visual direction"];

  return (
    <div>
      {brandKit ? (
        <p className="text-sm text-[var(--text-soft)]">Your brand kit is ready.</p>
      ) : (
        <p className="text-sm text-[var(--text-soft)]">Your finished brand kit will appear here.</p>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
            <p className="text-sm font-medium text-[var(--text)]">{item}</p>
            <p className="mt-1 text-xs text-[var(--text-soft)]">Included in the JSON export</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={downloadKit}
        disabled={!brandKit}
        className="mt-6 rounded-lg bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Download Complete Brand Kit
      </button>
    </div>
  );
}