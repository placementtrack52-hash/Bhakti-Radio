import categoriesData from '@/data/categories.json';

export async function generateStaticParams() {
  const categories = categoriesData as { slug: string }[];
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}
