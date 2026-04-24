import { useRef, useEffect, useState } from "react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const bgRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-04-25T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft(null);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero}>
      {/* parallax bg with real poster image */}
      <div className={styles.heroBg} ref={bgRef}>
        <div className={styles.heroGradient} />
        <img src="/poster.png" alt="" className={styles.posterBg} />
      </div>

      {/* dark overlay */}
      <div className={styles.overlay} />

      {/* content */}
      <div className={styles.heroContent}>
        {/* giant background text for branding */}
        <div className={styles.giantWatermark}>ANOTHERWAY</div>

        {/* collection badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          {timeLeft ? (
            <span>
              DROP IN: {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M {timeLeft.seconds}S
            </span>
          ) : (
            <span>PRE-ORDER NOW OPEN</span>
          )}
        </div>

        {/* brand title – SOV_Rajbutri only here */}
        <h1 className={styles.title}>
          <span className={styles.brandName}>อนาเธอร์เวย์</span>
          <span className={styles.collectionName}>THE MAD GENIUS VOL.1</span>
        </h1>

        {/* tagline */}
        <p className={styles.tagline}>NO PERFECT WAY, JUST ANOTHERWAY.</p>

        <div className={styles.divider} />

        {/* price pill */}
        <div className={styles.pricePill}>
          <span className={styles.priceNum}>฿790</span>
          <span className={styles.priceSep}>·</span>
          <span>S / M / L / XL / 2XL</span>
        </div>

        <button className={styles.ctaBtn} onClick={scrollToOrder}>
          <span>สั่งพรีออเดอร์เลย</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </div>

      <div className={styles.scrollHint}>SCROLL DOWN</div>
    </section>
  );
}