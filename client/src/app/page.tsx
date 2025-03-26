"use client";

import Link from "next/link";
import styles from "./landing.module.css";
import { FaMusic, FaSpotify, FaHeadphones, FaHeart } from "react-icons/fa";
import React from "react";

export default function Home() {
  // Add this useEffect to handle scroll animation
  React.useEffect(() => {
    const handleScroll = () => {
      const scrolledPercentage =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty(
        "--scroll",
        scrolledPercentage.toString()
      );

      // Activate animations when scrolled enough
      const floatingImage = document.querySelector(`.${styles.floatingImage}`);
      const secondFloatingImage = document.querySelector(
        `.${styles.secondFloatingImage}`
      );

      if (floatingImage && window.scrollY > 100) {
        floatingImage.style.animationPlayState = "running";
      }

      if (secondFloatingImage && window.scrollY > 150) {
        secondFloatingImage.style.animationPlayState = "running";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.backgroundImage1}></div>
      <div className={styles.backgroundImage2}></div>

      <div className={styles.navbarContainer}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <FaMusic className={styles.logoIcon} />
            <span>TunePulse</span>
          </div>

          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
            <Link href="/dashboard" className={styles.dashboardLink}>
              Dashboard
            </Link>
          </div>

          <Link href="/dashboard" className={styles.navCta}>
            Get Started
          </Link>
        </nav>
      </div>

      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          The answer <span className={styles.highlight}>to your</span>
          <br />
          musical discovery needs.
        </h1>

        <p className={styles.heroSubtitle}>
          TunePulse supports your musical journey with an award-winning user
          experience, a carefully curated library, and all the power of
          streaming at your fingertips.
        </p>

        <div className={styles.ctaButtons}>
          <Link href="/dashboard" className={styles.primaryBtn}>
            Explore Now
          </Link>
          <a href="#features" className={styles.secondaryBtn}>
            Try Demo
          </a>
        </div>

        <div className={styles.extraInfo}>
          Are you a music lover?{" "}
          <Link href="/dashboard" className={styles.inlineLink}>
            Try it for free
          </Link>
        </div>
      </div>

      <div className={styles.floatingImage}>
        <div className={styles.musicCard}>
          <img
            src="/bt.webp"
            alt="Music visualization"
            className={styles.cardImage}
          />
        </div>
      </div>

      <div className={styles.secondFloatingImage}>
        <div className={styles.musicCard}>
          <img src="/gu.jpg" alt="Music artwork" className={styles.cardImage} />
        </div>
      </div>

      <section className={styles.featuresSection}>
        <div className={styles.featuresSectionHeading}>
          <h2>A UNIFIED PLATFORM</h2>
          <h3>
            One Music Platform{" "}
            <span className={styles.highlight}>to Discover</span>,<br />
            Collect, and Experience
          </h3>
          <p>
            Break barriers between your music exploration and collection with a
            seamless integrated experience
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaHeadphones />
            </div>
            <h3 className={styles.featureTitle}>Tune Discover</h3>
            <h4 className={styles.featureSubtitle}>
              Personalized Music Discovery
            </h4>
            <p className={styles.featureDescription}>
              Unified visibility and smart recommendations based on your
              listening habits and preferences
            </p>
            <Link href="/dashboard" className={styles.featureLink}>
              Learn more <span>→</span>
            </Link>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaSpotify />
            </div>
            <h3 className={styles.featureTitle}>Tune Stream</h3>
            <h4 className={styles.featureSubtitle}>
              Manage Your Music Library
            </h4>
            <p className={styles.featureDescription}>
              Agentless visibility & intelligent organization that proactively
              enhances your listening experience
            </p>
            <Link href="/dashboard" className={styles.featureLink}>
              Learn more <span>→</span>
            </Link>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaHeart />
            </div>
            <h3 className={styles.featureTitle}>Tune Collect</h3>
            <h4 className={styles.featureSubtitle}>
              Build Your Personal Collection
            </h4>
            <p className={styles.featureDescription}>
              Real-time updates and smart categorization born for the modern
              music enthusiast
            </p>
            <Link href="/dashboard" className={styles.featureLink}>
              Learn more <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <div className={styles.partnersSection}>
        <div className={styles.partner}>
          <FaSpotify size={28} />
        </div>
        <div className={styles.partner}>
          <FaHeadphones size={28} />
        </div>
        <div className={styles.partner}>
          <FaHeart size={28} />
        </div>
        <div className={styles.partner}>
          <FaMusic size={28} />
        </div>
      </div>
    </main>
  );
}
