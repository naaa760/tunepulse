import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to MusicApp</h1>
        <p className={styles.description}>
          A simplified Spotify-like application for discovering and favoriting
          music.
        </p>
        <div className={styles.buttonContainer}>
          <Link href="/dashboard" className={styles.button}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
