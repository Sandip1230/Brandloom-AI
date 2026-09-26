// BrandKitExport.jsx
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

  return (
    <div className="border-t border-ink/15 pt-5">
      {brandKit ? (
        <p className="text-sm text-ink-soft">Your brand kit is ready.</p>
      ) : (
        <p className="text-sm text-ink-soft">Your finished brand kit will appear here.</p>
      )}
      <button
        type="button"
        onClick={downloadKit}
        disabled={!brandKit}
        className="mt-4 border border-ink px-5 py-2 text-sm text-ink transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
      >
        Download JSON
      </button>
    </div>
  );
}