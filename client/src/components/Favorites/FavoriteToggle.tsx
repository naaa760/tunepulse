import React from "react";
import styles from "./FavoriteToggle.module.css";

interface FavoriteToggleProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteToggle: React.FC<FavoriteToggleProps> = ({
  isFavorite,
  onToggle,
}) => {
  return (
    <button
      className={`${styles.favoriteButton} ${isFavorite ? styles.active : ""}`}
      onClick={onToggle}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <span className={styles.favoriteIcon}>❤️</span>
      ) : (
        <span className={styles.favoriteIcon}>🤍</span>
      )}
    </button>
  );
};

export default FavoriteToggle;
