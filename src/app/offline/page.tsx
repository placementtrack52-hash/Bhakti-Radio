export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#0D0808] flex items-center justify-center text-[#F5E6C0] text-center px-6">
      <div>
        <div className="text-6xl mb-6" aria-hidden="true">🪔</div>
        <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold text-gradient-gold mb-4">
          You are offline
        </h1>
        <p className="text-[#8a7258] max-w-sm mx-auto text-sm">
          Your internet connection has been lost. Previously visited pages and downloaded songs will still be available.
        </p>
        <p className="text-xs text-[#5a4a3a] mt-6">Om Namah Shivaya 🕉️</p>
      </div>
    </div>
  );
}
