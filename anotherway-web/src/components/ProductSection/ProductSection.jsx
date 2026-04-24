import { useState } from "react";
import styles from "./ProductSection.module.css";

const SIZES = ["S", "M", "L", "XL", "2XL"];

export default function ProductSection({ selectedSize, setSelectedSize, qty, setQty, onProceed }) {
  const [view, setView] = useState("front"); // "front" | "back"

  return (
    <section className={styles.section} id="order-section">
      {/* background branding */}
      <div className={styles.sectionWatermark}>GENIUS VOL.1</div>
      
      <div className={styles.container}>

        {/* ── LEFT: shirt image viewer ── */}
        <div className={styles.visual}>
          {/* image */}
          <div className={styles.imageWrap}>
            <img
              key={view}
              src={view === "front" ? "/shirt-front.png" : "/shirt-back.png"}
              alt={`THE MAD GENIUS – ${view}`}
              className={styles.shirtImg}
            />
            {/* collection number watermark */}
            <div className={styles.collectionMark}>22409652</div>
          </div>

          {/* front / back toggle */}
          <div className={styles.viewToggle}>
            <button
              className={`${styles.toggleBtn} ${view === "front" ? styles.activeToggle : ""}`}
              onClick={() => setView("front")}
            >
              FRONT
            </button>
            <button
              className={`${styles.toggleBtn} ${view === "back" ? styles.activeToggle : ""}`}
              onClick={() => setView("back")}
            >
              BACK
            </button>
          </div>
        </div>

        {/* ── RIGHT: product info ── */}
        <div className={styles.info}>

          {/* breadcrumb */}
          <p className={styles.breadcrumb}>ANOTHERWAY · COLLECTION 001</p>

          {/* product name – brand uses SOV_Rajbutri, subtitle Inter */}
          <h2 className={styles.productTitle}>
            <span className={styles.brandInTitle}>อนาเธอร์เวย์</span>
            <span className={styles.subTitle}>The Mad Genius Vol.1</span>
          </h2>

          {/* tagline */}
          <p className={styles.tagline}>"No perfect way, just anotherway."</p>

          {/* price + dates */}
          <div className={styles.priceRow}>
            <span className={styles.price}>฿790</span>
            <span className={styles.priceNote}>ราคารวม VAT</span>
          </div>

          <div className={styles.datesBanner}>
            <div className={styles.dateItem}>
              <span className={styles.dateLabel}>เปิดพรีออเดอร์</span>
              <span className={styles.dateVal}>25 เม.ย. 2026</span>
            </div>
            <div className={styles.dateSep} />
            <div className={styles.dateItem}>
              <span className={styles.dateLabel}>ปิดพรีออเดอร์</span>
              <span className={styles.dateVal}>05 พ.ค. 2026</span>
            </div>
          </div>

          {/* specs */}
          <div className={styles.specs}>
            <div className={styles.spec}>
              <span className={styles.specLabel}>วัสดุ</span>
              <span>Cotton 100% Heavyweight</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.specLabel}>ทรง</span>
              <span>Oversized Fit</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.specLabel}>สี</span>
              <span>Black</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.specLabel}>ส่งมอบ</span>
              <span>4–6 สัปดาห์</span>
            </div>
          </div>

          {/* size selector */}
          <div className={styles.sizeRow}>
            <span className={styles.label}>SIZE</span>
            {/* <span className={styles.sizeGuide}>ดูไกด์ไซส์ →</span> */}
          </div>
          <div className={styles.sizeGrid}>
            {SIZES.map(s => (
              <button
                key={s}
                className={`${styles.sizeBtn} ${selectedSize === s ? styles.active : ""}`}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* qty */}
          <div className={styles.qtyRow}>
            <span className={styles.label}>QTY</span>
            <div className={styles.qtyCtrl}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <span className={styles.totalPrice}>= ฿{(790 * qty).toLocaleString()}</span>
          </div>

          {/* CTA */}
          <button
            className="order-btn"
            onClick={() => {
              onProceed();
              document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Pre-Order Now
          </button>

          <p className={styles.disclaimer}>
            ชำระเงินหลังจากยืนยันออเดอร์ · จัดส่งทั่วประเทศ
          </p>
        </div>

      </div>
    </section>
  );
}