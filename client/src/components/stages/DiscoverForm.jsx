import { useState } from 'react';
import { useBrand } from '../../context/BrandContext.jsx';

export default function DiscoverForm() {
  const { brief, submitBrief, loading, error } = useBrand();
  const [value, setValue] = useState(brief);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await submitBrief(value.trim());
    } catch {
      // error already captured in context
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-lg font-semibold">Start with the idea</h2>
      <label htmlFor="brand-brief">What are you building, and who is it for?</label>
      <textarea
        id="brand-brief"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        required
        rows={5}
        className="w-full border rounded p-2"
      />
      {error && <p role="alert" className="text-red-600">{error}</p>}
      <button type="submit" disabled={loading || !value.trim()} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">
        {loading ? 'Working…' : 'Understand my idea'}
      </button>
    </form>
  );
}