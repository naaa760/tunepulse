import { SongList } from "@/components/Songs/SongList";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Music App</h1>
        <SongList />
      </div>
    </main>
  );
}
