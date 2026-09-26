export default function PositionCard({ position }) {
      if (!position) return <section aria-label="Brand position">Positioning results will appear here.</section>;
      return (
            <section aria-label="Brand position">
                  <h2>{position.category}</h2>
                  <p>{position.valueProposition}</p>
                  <p>{position.differentiator}</p>
            </section>
      );
}