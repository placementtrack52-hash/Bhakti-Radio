import Link from 'next/link';

const quotes = [
  'सर्वे भवन्तु सुखिनः — May all beings be happy.',
  'ॐ शान्तिः शान्तिः शान्तिः — Om Peace, Peace, Peace.',
  'हरि ओम तत् सत् — Hari Om Tat Sat.',
];

export default function Footer() {
  const quote = quotes[Math.floor(Date.now() / 86400000) % quotes.length];

  return (
    <footer
      className="relative border-t border-[rgba(212,168,67,0.1)] bg-[#08050f] pb-24"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl" aria-hidden="true">🪔</span>
              <span className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-gradient-gold">
                Bhakti Radio
              </span>
            </div>
            <p className="text-sm text-[#a0896a] leading-relaxed">
              A sanctuary of sacred sounds. Experience the timeless wisdom of devotional music.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-[family-name:var(--font-cinzel)] text-[#d4a843] font-semibold mb-4">Explore</h3>
            <ul className="space-y-2" role="list">
              {['Home', 'Radio', 'Schedule', 'Festivals', 'Deities'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                    className="text-sm text-[#a0896a] hover:text-[#d4a843] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Daily quote */}
          <div>
            <h3 className="font-[family-name:var(--font-cinzel)] text-[#d4a843] font-semibold mb-4">Daily Mantra</h3>
            <p className="text-sm text-[#a0896a] leading-relaxed font-[family-name:var(--font-noto)] italic">
              &ldquo;{quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[rgba(212,168,67,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6b5a42]">
            &copy; {new Date().getFullYear()} Bhakti Radio. Built with devotion 🪔
          </p>
          <p className="text-xs text-[#6b5a42]">
            ॐ नमः शिवाय
          </p>
        </div>
      </div>
    </footer>
  );
}
