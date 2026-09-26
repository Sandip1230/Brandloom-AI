import DiscoverForm from '../components/stages/DiscoverForm.jsx';
import ProgressStepper from '../components/ProgressStepper.jsx';

export default function Workflow() {
  return (
    <main>
      <header>
        <a href="/">Brandloom</a>
        <h1>Your brand workspace</h1>
      </header>
      <ProgressStepper />
      <DiscoverForm />
    </main>
  );
}