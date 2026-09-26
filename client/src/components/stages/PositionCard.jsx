export default function PositionCard({ position }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card label="Category" body={position.category} />
      <Card label="Differentiator" body={position.differentiator} />
      <Card label="Value Proposition" body={position.valueProposition} className="sm:col-span-2" />
      <Card label="Competitive Angle" body={position.competitiveAngle} />
      <Card label="Positioning Statement" body={position.positioningStatement} quote />
    </div>
  );
}

function Card({ label, body, quote, className = "" }) {
  return (
    <div className={"border border-paper/15 bg-ink px-5 py-4 " + className}>
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold">{label}</span>
      <p className="mt-2 text-sm text-paper/80">{quote ? `"${body}"` : body}</p>
    </div>
  );
}