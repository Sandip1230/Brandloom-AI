import { useState } from "react";

const TABS = ["Overview", "Position", "Personality", "Visual"];

export default function BrandKitExport({ brandKit }) {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const { summary, position = {}, personality = {}, visual = {}, openGaps = [] } = brandKit;

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
      <div className="border border-gold/30 bg-gold/5 px-5 py-4">
        <p className="text-sm text-paper/85">{summary}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-1 border-b border-paper/15">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={
              "px-3 py-2 text-sm transition-colors " +
              (activeTab === tab
                ? "border-b-2 border-gold text-paper"
                : "text-paper/45 hover:text-paper/70")
            }
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {activeTab === "Overview" && (
          <div className="space-y-3">
            <p className="text-sm text-paper/70">
              Everything below was carried forward from Discover through Challenge — nothing here
              was invented at this final step.
            </p>
            {openGaps.length > 0 && (
              <div className="border border-paper/15 bg-ink px-4 py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper/40">
                  Still Open
                </span>
                <ul className="mt-2 space-y-1">
                  {openGaps.map((gap, index) => (
                    <li key={`${gap}-${index}`} className="text-sm text-paper/70">
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
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={downloadKit}
          className="bg-gold px-6 py-3 text-sm text-ink transition-colors hover:bg-paper"
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
    return <p className="text-sm text-paper/50">Nothing carried over for this section.</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {entries.map(([key, value]) => (
        <div key={key} className="border border-paper/15 bg-ink px-4 py-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold">{key}</span>
          <p className="mt-1 text-sm text-paper/80">
            {Array.isArray(value) ? value.join(", ") : String(value)}
          </p>
        </div>
      ))}
    </div>
  );
}