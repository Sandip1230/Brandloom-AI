import { useState } from "react";

export default function PersonalityBoard({ traits = [], traitsToAvoid = [], namingDirections = [], voice, taglineOptions = [] }) {
  const [selectedTagline, setSelectedTagline] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold">Personality Traits</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {traits.map((trait) => (
            <span key={trait} className="border border-paper/25 bg-ink px-3 py-1 text-sm text-paper">
              {trait}
            </span>
          ))}
        </div>
      </div>

      {traitsToAvoid.length > 0 && (
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper/40">Traits to Avoid</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {traitsToAvoid.map((trait) => (
              <span key={trait} className="border border-paper/10 px-3 py-1 text-sm text-paper/40 line-through">
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}

      {voice && (
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold">Brand Voice</span>
          <p className="mt-2 max-w-prose text-sm text-paper/80">{voice}</p>
        </div>
      )}

      {namingDirections.length > 0 && (
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold">Naming Directions</span>
          <ul className="mt-2 space-y-1">
            {namingDirections.map((direction, index) => (
              <li key={`${direction}-${index}`} className="text-sm text-paper/80">
                • {direction}
              </li>
            ))}
          </ul>
        </div>
      )}

      {taglineOptions.length > 0 && (
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold">Tagline Suggestions</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {taglineOptions.map((tagline, index) => (
              <button
                key={`${tagline}-${index}`}
                type="button"
                onClick={() => setSelectedTagline(index)}
                className={
                  "border px-3 py-2 text-left text-sm transition-colors " +
                  (index === selectedTagline
                    ? "border-gold bg-gold/10 text-paper"
                    : "border-paper/20 text-paper/70 hover:border-paper/40")
                }
              >
                {tagline}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}