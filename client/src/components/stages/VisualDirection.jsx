export default function VisualDirection({ direction }) {
      return (
            <section aria-label="Visual direction">
                  <h2>Visual direction</h2>
                  {direction ? <pre>{JSON.stringify(direction, null, 2)}</pre> : <p>Typography, color, and imagery guidance will appear here.</p>}
            </section>
      );
}