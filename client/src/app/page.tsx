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

      {/* Podcast Images Grid */}
      <section className="container mx-auto px-4 pb-24 relative">
        <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
          {/* Left column */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt="Podcast host with headphones"
                width={300}
                height={400}
                className="w-full h-auto object-cover aspect-[3/4]"
              />
            </div>
          </div>

          {/* Middle column */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Group podcast recording"
                width={300}
                height={200}
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Person recording podcast"
                width={300}
                height={200}
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Two people recording podcast"
                width={300}
                height={200}
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Two hosts discussing"
                width={300}
                height={200}
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
          </div>
        </div>

        {/* Center featured image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-80 md:w-72 md:h-96">
          <div className="rounded-2xl overflow-hidden h-full">
            <Image
              src="/placeholder.svg?height=400&width=300"
              alt="Featured podcast host"
              width={300}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
