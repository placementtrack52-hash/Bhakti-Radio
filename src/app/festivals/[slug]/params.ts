import festivalsData from '@/data/festivals.json';

export async function generateStaticParams() {
  const festivals = festivalsData as { slug: string }[];
  return festivals.map((fest) => ({
    slug: fest.slug,
  }));
}
