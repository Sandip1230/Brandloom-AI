import { useState } from 'react';
import { useBrand } from '../../context/BrandContext.jsx';

export default function DiscoverForm() {
  const { brand, submitBrief } = useBrand();
  const [brief, setBrief] = useState(brand.brief);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await submitBrief(brief.trim());
    } catch {
      setError('The understand stage is not connected yet. Check the API server and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Start with the idea</h2>
      <label htmlFor="brand-brief">What are you building, and who is it for?</label>
      <textarea id="brand-brief" value={brief} onChange={(event) => setBrief(event.target.value)} required rows={5} />
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={submitting || !brief.trim()}>
        {submitting ? 'Working…' : 'Understand my idea'}
      </button>
    </form>
  );
}