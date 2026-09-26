export default function PersonalityBoard({ traits = [] }) {
      return (
            <section aria-label="Brand personality">
                  <h2>Personality</h2>
                  {traits.length ? <ul>{traits.map((trait) => <li key={trait}>{trait}</li>)}</ul> : <p>Personality traits will appear here.</p>}
            </section>
      );
}