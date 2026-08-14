import React from 'react';
import { notFound } from 'next/navigation';
import songsData from '@/data/songs.json';
import { Song } from '@/types/song';
import ReaderClient from '@/components/lyrics/ReaderClient';

const songs = songsData as Song[];

export async function generateStaticParams() {
  return songs.map((song) => ({
    id: String(song.id),
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReaderPage({ params }: PageProps) {
  const { id } = await params;
  const song = songs.find((s) => String(s.id) === id);

  if (!song) {
    notFound();
  }

  return (
    <ReaderClient song={song} />
  );
}
