import { SongList } from "@/components/Songs/SongList";

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Your Music Dashboard
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
            Discover, search, and enjoy your favorite music all in one place
          </p>
        </div>

        <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <SongList />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-300">
          <p>Powered by Spotify API</p>
        </div>
      </div>
    </main>
  );
}
