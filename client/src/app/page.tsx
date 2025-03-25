import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import styles from "./page.module.css";

export default function PodcastLandingPage() {
  return (
    <div className={styles.landingPage}>
      {/* Background Image */}
      <div className={styles.backgroundImage} />

      {/* Enhanced Navigation */}
      <header className="container mx-auto py-4 px-4 relative z-10">
        <div className={styles.navbarContainer}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-emerald-400"></div>
              </div>
            </div>
            <span className="text-xl font-bold">Voicebox</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className={`${styles.navButton} flex items-center gap-1`}>
                Demos <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="relative group">
              <button className={`${styles.navButton} flex items-center gap-1`}>
                CMS Pages <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="relative group">
              <button className={`${styles.navButton} flex items-center gap-1`}>
                Essential Pages <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <Link href="#" className={styles.navButton}>
              About Us
            </Link>
            <Link href="#" className={styles.navButton}>
              Contact
            </Link>
            <Link href="/dashboard" className={styles.dashboardButton}>
              Go to Dashboard
            </Link>
          </nav>

          <Button className={styles.subscribeButton}>Subscribe Now</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto leading-tight text-white drop-shadow-lg">
          Find & Listen Your Favorite Podcasts!
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button className={styles.heroButton}>Start Trial For Free</Button>
          <Button variant="outline" className={styles.outlineButton}>
            See All Episodes
          </Button>
        </div>
      </section>

      {/* Beautiful image card that appears on scroll */}
      <section className={styles.imageCardSection}>
        <div className={styles.cardContainer}>
          <div className={styles.imageCard}>
            <Image
              src="/ca.webp"
              alt="Beautiful music visualization"
              width={600}
              height={400}
              className={styles.cardImage}
              priority
            />
            <div className={styles.cardContent}>
              <h2>Experience Music Like Never Before</h2>
              <p>
                Discover new artists, create playlists, and enjoy your favorite
                tracks all in one place.
              </p>
              <button className={styles.cardButton}>Explore Now</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
