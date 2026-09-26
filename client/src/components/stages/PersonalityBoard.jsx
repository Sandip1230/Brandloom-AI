// PersonalityBoard.jsx
export default function PersonalityBoard({ traits = [] }) {
  if (!traits.length) {
    return <p className="text-sm text-ink-soft">Personality traits will appear here.</p>;
  }
  return (
    <ul className="flex flex-wrap gap-2 border-t border-ink/15 pt-5">
      {traits.map((trait) => (
        <li key={trait} className="border border-ink/20 px-3 py-1 text-sm text-ink">
          {trait}
        </li>
      ))}
    </ul>
  );
}