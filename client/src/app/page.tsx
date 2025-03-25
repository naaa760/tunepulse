import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PodcastLandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-400"></div>
          <span className="text-xl font-bold">Voicebox</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
              Demos <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
              CMS Pages <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
              Essential Pages <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <Link href="#" className="hover:text-emerald-400 transition-colors">
            About Us
          </Link>
          <Link href="#" className="hover:text-emerald-400 transition-colors">
            Contact
          </Link>
          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Go to Dashboard
          </Link>
        </nav>

        <Button className="bg-emerald-400 hover:bg-emerald-500 text-black font-medium rounded-full">
          Subscribe Now
        </Button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
          Find & Listen Your Favorite Podcasts!
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button className="bg-emerald-400 hover:bg-emerald-500 text-black font-medium rounded-full px-8 py-6">
            Start Trial For Free
          </Button>
          <Button
            variant="outline"
            className="border-white hover:bg-white/10 rounded-full px-8 py-6"
          >
            See All Episodes
          </Button>
        </div>
      </section>
    </div>
  );
}
