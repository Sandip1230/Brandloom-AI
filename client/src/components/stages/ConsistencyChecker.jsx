export default function ConsistencyChecker({ findings = [] }) {
      return (
            <section aria-label="Consistency check">
                  <h2>Consistency check</h2>
                  {findings.length ? <ul>{findings.map((finding, index) => <li key={`${finding}-${index}`}>{finding}</li>)}</ul> : <p>Consistency findings will appear here.</p>}
            </section>
      );
}