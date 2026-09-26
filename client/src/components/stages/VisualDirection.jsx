import { useState } from "react";

const TABS = ["Logo Concepts", "Color Palette", "Typography", "Imagery Style"];

export default function VisualDirection({ direction }) {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const { logoConcepts = [], colorPalette = [], typography, imageryStyle, conceptsToAvoid = [] } = direction;

  return (
    <div>
      <div className="flex flex-wrap gap-1 border-b border-paper/15">
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

      <div className="mt-6">
        {activeTab === "Logo Concepts" && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {logoConcepts.map((concept, index) => (
              <div key={`${concept.name}-${index}`} className="border border-paper/15 bg-ink p-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center border border-gold/40 font-display text-lg text-gold">
                  {concept.name?.[0]?.toUpperCase() ?? "?"}
                </div>
                <p className="mt-3 text-sm text-paper">{concept.name}</p>
                <p className="mt-1 text-xs text-paper/50">{concept.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Color Palette" && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {colorPalette.map((color, index) => (
              <div key={`${color.hex}-${index}`} className="border border-paper/15 bg-ink">
                <div className="h-20 w-full" style={{ backgroundColor: color.hex }} />
                <div className="p-3">
                  <p className="text-sm text-paper">{color.name}</p>
                  <p className="font-mono text-xs text-paper/50">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Typography" && typography && (
          <div className="space-y-5">
            <div className="border border-paper/15 bg-ink p-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold">Heading</span>
              <p className="mt-2 font-display text-3xl text-paper">{typography.heading}</p>
            </div>
            <div className="border border-paper/15 bg-ink p-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold">Body</span>
              <p className="mt-2 text-lg text-paper">{typography.body}</p>
            </div>
            <p className="text-sm text-paper/60">{typography.rationale}</p>
          </div>
        )}

        {activeTab === "Imagery Style" && (
          <div className="space-y-4">
            <p className="max-w-prose text-sm text-paper/80">{imageryStyle}</p>
            {conceptsToAvoid.length > 0 && (
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper/40">Avoid</span>
                <ul className="mt-2 space-y-1">
                  {conceptsToAvoid.map((concept, index) => (
                    <li key={`${concept}-${index}`} className="text-sm text-paper/60">
                      • {concept}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}