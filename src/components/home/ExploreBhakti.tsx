import Link from 'next/link';

interface ExploreCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  gradient: string;
  borderColor: string;
}

const cards: ExploreCard[] = [
  {
    id: 'explore-deities',
    title: 'Deities',
    description: 'Explore music dedicated to Shiva, Vishnu, Lakshmi, Durga, and more.',
    icon: '🔱',
    href: '/deities',
    gradient: 'linear-gradient(135deg, rgba(139,69,19,0.3) 0%, rgba(212,168,67,0.1) 100%)',
    borderColor: 'rgba(212,168,67,0.3)',
  },
  {
    id: 'explore-festivals',
    title: 'Festivals',
    description: 'Sacred music for Diwali, Navratri, Janmashtami, Mahashivratri.',
    icon: '🎊',
    href: '/festivals',
    gradient: 'linear-gradient(135deg, rgba(255,107,0,0.2) 0%, rgba(255,107,157,0.1) 100%)',
    borderColor: 'rgba(255,107,0,0.3)',
  },
  {
    id: 'explore-mantras',
    title: 'Mantras',
    description: 'Powerful vedic mantras for meditation, healing, and spiritual awakening.',
    icon: '🕉️',
    href: '/radio',
    gradient: 'linear-gradient(135deg, rgba(100,0,100,0.3) 0%, rgba(200,100,255,0.1) 100%)',
    borderColor: 'rgba(200,100,255,0.3)',
  },
  {
    id: 'explore-texts',
    title: 'Sacred Texts',
    description: 'Audio renditions of Bhagavad Gita, Ramayana, and Upanishads.',
    icon: '📖',
    href: '/radio',
    gradient: 'linear-gradient(135deg, rgba(0,80,120,0.3) 0%, rgba(0,150,200,0.1) 100%)',
    borderColor: 'rgba(0,150,200,0.3)',
  },
];

export default function ExploreBhakti() {
  return (
    <section
      className="py-20 px-4"
      aria-label="Explore Bhakti"
      role="region"
      id="explore"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-[family-name:var(--font-cinzel)] tracking-[0.3em] text-[#d4a843] uppercase mb-3">
            <span className="w-6 h-px bg-[#d4a843]" />
            Journey
            <span className="w-6 h-px bg-[#d4a843]" />
          </div>
          <h2 className="font-[family-name:var(--font-cinzel)] text-3xl md:text-4xl font-bold text-gradient-gold">
            Explore Bhakti
          </h2>
          <p className="text-[#8a7258] mt-3 text-sm max-w-md mx-auto">
            Dive deeper into the ocean of devotion
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              id={card.id}
              role="listitem"
              className="group relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                background: card.gradient,
                border: `1px solid ${card.borderColor}`,
              }}
              aria-label={`Explore ${card.title}`}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: `1px solid ${card.borderColor}`,
                }}
                aria-hidden="true"
              >
                {card.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-[family-name:var(--font-cinzel)] font-bold text-white text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-[#8a7258] text-sm leading-relaxed">{card.description}</p>
              </div>

              {/* Arrow */}
              <div className="mt-auto flex items-center gap-1 text-[#d4a843] text-sm font-semibold group-hover:gap-2 transition-all">
                Explore
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px ${card.borderColor}`,
                  background: 'rgba(255,255,255,0.02)',
                }}
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
