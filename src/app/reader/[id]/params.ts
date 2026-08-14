import songsData from '@/data/songs.json';

export async function generateStaticParams() {
  const songs = songsData as { id: number }[];
  return songs.map((song) => ({
    id: String(song.id),
  }));
}
