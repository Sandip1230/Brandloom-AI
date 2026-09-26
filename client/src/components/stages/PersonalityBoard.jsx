export default function PersonalityBoard({
  traits = [],
  traitsToAvoid = [],
  namingDirections = [],
  voice,
  tagline,
}) {
  if (!traits.length) {
    return <p className="text-sm text-[var(--text-soft)]">Personality traits will appear here.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-soft)]">
          Personality Traits
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {traits.map((trait) => (
            <span
              key={trait}
              className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-sm text-[var(--text)]"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>

      {traitsToAvoid.length > 0 && (
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-soft)]">
            Traits to Avoid
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {traitsToAvoid.map((trait) => (
              <span
                key={trait}
                className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-soft)] line-through"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}

      {voice && (
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-soft)]">
            Brand Voice
          </span>
          <p className="mt-2 text-sm text-[var(--text)]">{voice}</p>
        </div>
      )}

      {namingDirections.length > 0 && (
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-soft)]">
            Naming Directions
          </span>
          <ul className="mt-2 space-y-1">
            {namingDirections.map((direction, index) => (
              <li key={`${direction}-${index}`} className="text-sm text-[var(--text)]">
                • {direction}
              </li>
            ))}
          </ul>
        </div>
      )}

      {tagline && (
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-soft)]">
            Tagline
          </span>
          <p className="mt-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm font-medium text-[var(--text)]">
            "{tagline}"
          </p>
        </div>
      )}
    </div>
  );
}