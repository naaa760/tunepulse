"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🎵</span>
          <span className={styles.logoText}>Music App</span>
        </div>
        <div className={styles.navLinks}>
          <Link href="/dashboard" className={styles.navLink}>
            Dashboard
          </Link>
          <Link href="/favorites" className={styles.navLink}>
            Favorites
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.heroSection}>
          <h1 className={styles.title}>Discover Your Perfect Soundtrack</h1>
          <p className={styles.subtitle}>
            Browse, search, and save your favorite songs in one place
          </p>
          <Link href="/dashboard" className={styles.dashboardButton}>
            Go to Dashboard
          </Link>
        </div>

        <div className={styles.featuresSection}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔍</div>
            <h2 className={styles.featureTitle}>Search</h2>
            <p className={styles.featureDescription}>
              Find songs by title, artist, or album
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>❤️</div>
            <h2 className={styles.featureTitle}>Favorites</h2>
            <p className={styles.featureDescription}>
              Save your favorite songs for quick access
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🎧</div>
            <h2 className={styles.featureTitle}>Discover</h2>
            <p className={styles.featureDescription}>
              Explore new music and expand your collection
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2023 Music App. All rights reserved.</p>
      </footer>
    </div>
  );
}
