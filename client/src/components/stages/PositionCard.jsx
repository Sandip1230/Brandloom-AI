// PositionCard.jsx
export default function PositionCard({ position }) {
  if (!position) {
    return <p className="text-sm text-ink-soft">Positioning results will appear here.</p>;
  }
  return (
    <div className="space-y-3 border-t border-ink/15 pt-5">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold">Category</span>
        <p className="mt-1 text-ink">{position.category}</p>
      </div>
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold">Value proposition</span>
        <p className="mt-1 text-ink">{position.valueProposition}</p>
      </div>
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold">Differentiator</span>
        <p className="mt-1 text-ink">{position.differentiator}</p>
      </div>
    </div>
  );
}