export default function BrandKitExport({ brandKit }) {
      function downloadKit() {
            const file = new Blob([JSON.stringify(brandKit, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'brand-kit.json';
            link.click();
            URL.revokeObjectURL(url);
      }

      return (
            <section aria-label="Brand kit export">
                  <h2>Brand kit</h2>
                  <button type="button" onClick={downloadKit} disabled={!brandKit}>Download JSON</button>
            </section>
      );
}