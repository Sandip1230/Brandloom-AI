import { useState } from "react";

const TABS = ["Overview", "Position", "Personality", "Visual", "Launch"];

export default function BrandKitExport({ brandKit }) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  if (!brandKit) {
    return <p className="text-sm text-[var(--text-soft)]">Your finished brand kit will appear here.</p>;
  }

  const { brandName, summary, position = {}, personality = {}, visual = {}, launch = {}, openGaps = [] } = brandKit;

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
    <div>
      {brandName && (
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--accent-solid)]">
          {brandName}
        </p>
      )}
      <div className="rounded-xl border border-[var(--accent-solid)]/30 bg-[var(--surface-2)] px-5 py-4">
        <p className="text-sm text-[var(--text)]">{summary}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-1 border-b border-[var(--border)]">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={
              "px-3 py-2 text-sm transition-colors " +
              (activeTab === tab
                ? "border-b-2 border-[var(--accent-solid)] font-medium text-[var(--text)]"
                : "text-[var(--text-soft)] hover:text-[var(--text)]")
            }
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {activeTab === "Overview" && (
          <div className="space-y-3">
            <p className="text-sm text-[var(--text-soft)]">
              Everything below was carried forward from Discover through Challenge — nothing here
              was invented at this final step.
            </p>
            {openGaps.length > 0 && (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3">
                <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-soft)]">
                  Still Open
                </span>
                <ul className="mt-2 space-y-1">
                  {openGaps.map((gap, index) => (
                    <li key={`${gap}-${index}`} className="text-sm text-[var(--text)]">
                      • {gap}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "Position" && <KeyValueGrid data={position} />}
        {activeTab === "Personality" && <KeyValueGrid data={personality} />}
        {activeTab === "Visual" && <KeyValueGrid data={visual} />}
        {activeTab === "Launch" && <KeyValueGrid data={launch} />}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={downloadKit}
          className="rounded-lg bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Download Complete Brand Kit (JSON)
        </button>
      </div>
    </div>
  );
}

function KeyValueGrid({ data }) {
  const entries = Object.entries(data || {});
  if (!entries.length) {
    return <p className="text-sm text-[var(--text-soft)]">Nothing carried over for this section.</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {entries.map(([key, value]) => (
        <div key={key} className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3">
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--accent-solid)]">{key}</span>
          <p className="mt-1 text-sm text-[var(--text)]">
            {Array.isArray(value) ? value.join(", ") : String(value)}
          </p>
        </div>
      ))}
    </div>
  );
}