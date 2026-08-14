import React from 'react';
import { notFound } from 'next/navigation';
import categoriesData from '@/data/categories.json';
import songsData from '@/data/songs.json';
import { Category } from '@/types/deity';
import { Song } from '@/types/song';
import CategoryDetailClient from '@/components/categories/CategoryDetailClient';

const categories = categoriesData as Category[];
const songs = songsData as Song[];

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categorySongs = songs.filter((s) => s.category === category.name);

  return (
    <CategoryDetailClient
      category={category}
      categorySongs={categorySongs}
    />
  );
}
