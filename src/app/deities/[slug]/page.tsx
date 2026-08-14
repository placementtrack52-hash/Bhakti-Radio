import React from 'react';
import { notFound } from 'next/navigation';
import deitiesData from '@/data/deities.json';
import songsData from '@/data/songs.json';
import { Deity } from '@/types/deity';
import { Song } from '@/types/song';
import DeityDetailClient from '@/components/deities/DeityDetailClient';

const deities = deitiesData as Deity[];
const songs = songsData as Song[];

export async function generateStaticParams() {
  return deities.map((deity) => ({
    slug: deity.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DeityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const deity = deities.find((d) => d.slug === slug);

  if (!deity) {
    notFound();
  }

  const deitySongs = songs.filter((s) => s.deity === deity.name);

  return (
    <DeityDetailClient
      deity={deity}
      deitySongs={deitySongs}
      allSongs={songs}
    />
  );
}
