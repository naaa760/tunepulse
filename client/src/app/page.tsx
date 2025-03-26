import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-emerald-950">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold">MusicApp</div>
          <div>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
              >
                Dashboard
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Your Music, Your Way
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Discover new music, create playlists, and enjoy your favorite songs
          all in one place.
        </p>
        <Link href="/dashboard">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full">
            Start Listening
          </Button>
        </Link>
      </main>

      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gray-900 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Discover</h3>
            <p className="text-gray-300">
              Find new music based on your preferences and listening habits.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Search</h3>
            <p className="text-gray-300">
              Search for your favorite songs, artists, and albums.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Favorites</h3>
            <p className="text-gray-300">
              Save your favorite songs and access them anytime.
            </p>
          </div>
        </div>
      </section>

      <footer className="container mx-auto px-4 py-10 text-center text-gray-400">
        <p>© 2023 MusicApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
