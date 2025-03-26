import { useState, useEffect } from "react";
import { isFavorite, toggleFavorite } from "@/lib/favoriteService";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import styles from "./FavoriteButton.module.css";

interface FavoriteButtonProps {
  songId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ songId }) => {
  const [isFav, setIsFav] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkFavoriteStatus() {
      try {
        const status = await isFavorite(songId);
        setIsFav(status);
      } catch (err) {
        console.error("Failed to check favorite status:", err);
      } finally {
        setIsLoading(false);
      }
    }

    checkFavoriteStatus();
  }, [songId]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      await toggleFavorite(songId);
      setIsFav(!isFav);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={styles.favoriteButton}
      onClick={handleToggleFavorite}
      disabled={isLoading}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      {isFav ? (
        <MdFavorite className={styles.favoriteIcon} />
      ) : (
        <MdFavoriteBorder className={styles.favoriteIcon} />
      )}
    </button>
  );
};

export default FavoriteButton;
