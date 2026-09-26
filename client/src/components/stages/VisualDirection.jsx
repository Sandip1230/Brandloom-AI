import { useState } from "react";

const TABS = ["Typography", "Color Mood", "Imagery Style", "Avoid"];

export default function VisualDirection({ direction }) {
  const [tab, setTab] = useState(TABS[0]);

  if (!direction) {
    return (
      <p className="text-sm text-[var(--text-soft)]">
        Typography, color, and imagery guidance will appear here.
      </p>
    );
  }

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-[var(--border)]">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={
              "whitespace-nowrap px-3 py-2 text-sm transition-colors " +
              (tab === t
                ? "border-b-2 border-[var(--accent-solid)] font-medium text-[var(--text)]"
                : "text-[var(--text-soft)]")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm text-[var(--text)]">
        {tab === "Typography" && (direction.typography || "—")}
        {tab === "Color Mood" && (direction.colorMood || "—")}
        {tab === "Imagery Style" && (direction.imageryStyle || "—")}
        {tab === "Avoid" &&
          (direction.conceptsToAvoid?.length ? (
            <ul className="list-disc space-y-1 pl-4">
              {direction.conceptsToAvoid.map((concept, index) => (
                <li key={index}>{concept}</li>
              ))}
            </ul>
          ) : (
            "—"
          ))}
      </div>
    </div>
  );
}