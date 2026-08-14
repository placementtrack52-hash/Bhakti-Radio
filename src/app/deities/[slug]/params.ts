import deitiesData from '@/data/deities.json';

export async function generateStaticParams() {
  const deities = deitiesData as { slug: string }[];
  return deities.map((deity) => ({
    slug: deity.slug,
  }));
}
