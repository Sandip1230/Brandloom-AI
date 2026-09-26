// VisualDirection.jsx
export default function VisualDirection({ direction }) {
  if (!direction) {
    return (
      <p className="text-sm text-ink-soft">
        Typography, color, and imagery guidance will appear here.
      </p>
    );
  }
  return (
    <pre className="overflow-x-auto border-t border-ink/15 pt-5 font-mono text-xs leading-relaxed text-ink-soft">
      {JSON.stringify(direction, null, 2)}
    </pre>
  );
}