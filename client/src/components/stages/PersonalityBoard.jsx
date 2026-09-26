export default function PersonalityBoard({ traits = [] }) {
  if (!traits.length) {
    return <p className="text-sm text-[var(--text-soft)]">Personality traits will appear here.</p>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {traits.map((trait) => (
        <span
          key={trait}
          className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-sm text-[var(--text)]"
        >
          {trait}
        </span>
      ))}
    </div>
  );
}