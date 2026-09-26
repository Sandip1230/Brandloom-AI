// ConsistencyChecker.jsx
export default function ConsistencyChecker({ findings = [] }) {
  if (!findings.length) {
    return <p className="text-sm text-ink-soft">Consistency findings will appear here.</p>;
  }
  return (
    <ul className="space-y-2 border-t border-ink/15 pt-5">
      {findings.map((finding, index) => (
        <li key={`${finding}-${index}`} className="flex gap-2 text-sm text-ink">
          <span className="text-gold">—</span>
          {finding}
        </li>
      ))}
    </ul>
  );
}