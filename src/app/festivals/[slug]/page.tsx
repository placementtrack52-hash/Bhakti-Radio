import React from 'react';
import { notFound } from 'next/navigation';
import festivalsData from '@/data/festivals.json';
import songsData from '@/data/songs.json';
import { Festival } from '@/types/festival';
import { Song } from '@/types/song';
import FestivalDetailClient from '@/components/festivals/FestivalDetailClient';

const festivals = festivalsData as Festival[];
const songs = songsData as Song[];

export async function generateStaticParams() {
  return festivals.map((fest) => ({
    slug: fest.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function FestivalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const festival = festivals.find((f) => f.slug === slug);

  if (!festival) {
    notFound();
  }

  // Filter songs matching this festival theme
  const festivalSongs = songs.filter((s) => s.deity?.toLowerCase() === festival.theme.toLowerCase() || s.tags?.includes(festival.slug));

  return (
    <FestivalDetailClient
      festival={festival}
      festivalSongs={festivalSongs}
    />
  );
}
