"use client";

import { useEffect } from "react";

export default function ScrollObserver() {
  useEffect(() => {
    const updateScrollAnimation = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      document.documentElement.style.setProperty(
        "--scroll",
        scrollPercent.toString()
      );

      // Find all elements with animation-play-state: paused
      const animatedElements = document.querySelectorAll(".cardContainer");
      animatedElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          (el as HTMLElement).style.animationPlayState = "running";
        }
      });
    };

    window.addEventListener("scroll", updateScrollAnimation);
    updateScrollAnimation(); // Initial call

    return () => window.removeEventListener("scroll", updateScrollAnimation);
  }, []);

  return null;
}
