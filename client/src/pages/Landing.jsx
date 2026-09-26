import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <main>
      <h1>Brandloom</h1>
      <p>Turn a rough idea into a coherent brand system.</p>
      <Link to="/workflow">Start building</Link>
    </main>
  );
}