import { useState } from "react";
import qrImg from "../../assets/payment/promptpay.jpg";
import styles from "./OrderForm.module.css";

export default function OrderForm({
  form, setForm,
  selectedSize, qty,
  step,
  loading, error, orderId,
  onSubmit, onReset,
}) {
  const [slip, setSlip] = useState(null);
  const [slipPreview, setSlipPreview] = useState(null);
  const [isCopying, setIsCopying] = useState(false);

  const PRICE = 790;
  const total = PRICE * qty;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSlip(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlipPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSlipSubmit = async () => {
    if (!slip) {
      alert("กรุณาแนบรูปสลิปก่อนยืนยันครับ");
      return;
    }
    // We pass the base64 slip to the parent onSubmit if needed, 
    // or call a separate prop. For simplicity, let's just use onSubmit 
    // but pass the slip data.
    onSubmit(slipPreview);
  };

  return (
    <section className={styles.section} id="form-section">
      <div className={styles.container}>

        <div className={styles.header}>
          <div className={styles.line} />
          <h2 className={styles.title}>
            กรอกข้อมูล <span>Pre-Order</span>
          </h2>
          <div className={styles.line} />
        </div>

        {step === "success" ? (
          <div className={styles.successBox}>
            <div className={styles.successIcon}>✓</div>
            <h3>สั่งซื้อสำเร็จ!</h3>
            <p>หมายเลขออเดอร์ของคุณคือ</p>
            <div className={styles.orderIdBox}>{orderId}</div>

            <div className={styles.paymentContainer}>
              <p style={{ color: "var(--cream)", marginBottom: "1rem", fontWeight: "600" }}>
                ยอดชำระเงิน: ฿{total.toLocaleString()}
              </p>


              <div className={styles.bankInfo}>
                <span className={styles.bankName}>ธนาคารกสิกรไทย</span>
                <span className={styles.accountName}>นาย วัชรพงศ์ เสือสง่า</span>
                <div className={styles.copyBox}>
                  <span className={styles.accountNum}>159-1-37596-9</span>
                  <button className={styles.copyBtn} onClick={() => handleCopy("1591375969")}>
                    {isCopying ? "คัดลอกแล้ว!" : "คัดลอกเลขบัญชี"}
                  </button>
                </div>
              </div>

              <div className={styles.uploadArea}>
                <label>แนบสลิปการโอนเงิน</label>
                <div className={styles.fileInputWrapper}>
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                {slipPreview && (
                  <div className={styles.previewBox}>
                    <img src={slipPreview} alt="Slip Preview" />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.successActions}>
              <button
                className="order-btn big"
                onClick={handleSlipSubmit}
                disabled={loading}
              >
                {loading ? "กำลังส่งข้อมูล..." : "แจ้งโอนเงินและเสร็จสิ้น"}
              </button>
              <button className={styles.secondaryBtn} onClick={onReset}>
                กลับหน้าหลัก
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.grid}>
            {/* ... remaining form fields ... */}

            <div className={styles.field}>
              <label>ชื่อ - นามสกุล *</label>
              <input
                placeholder="กรอกชื่อ-นามสกุล"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className={styles.field}>
              <label>เบอร์โทรศัพท์ *</label>
              <input
                placeholder="08X-XXX-XXXX"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className={`${styles.field} ${styles.full}`}>
              <label>อีเมล</label>
              <input
                placeholder="email@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className={`${styles.field} ${styles.full}`}>
              <label>ที่อยู่จัดส่ง *</label>
              <textarea
                rows={3}
                placeholder="บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์"
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
              />
            </div>

            <div className={`${styles.field} ${styles.full}`}>
              <label>หมายเหตุ</label>
              <textarea
                rows={2}
                placeholder="ข้อความถึงแบรนด์ (ถ้ามี)"
                value={form.note}
                onChange={e => setForm({ ...form, note: e.target.value })}
              />
            </div>

            {/* order summary */}
            <div className={`${styles.field} ${styles.full}`}>
              <div className={styles.summaryBox}>
                <div className={styles.summaryRow}>
                  <span>สินค้า</span>
                  <span>The Mad Genius Vol.1</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>ไซส์</span>
                  <span>{selectedSize || "—"}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>จำนวน</span>
                  <span>{qty} ชิ้น</span>
                </div>
                <div className={styles.summaryDivider} />
                <div className={`${styles.summaryRow} ${styles.total}`}>
                  <span>รวม</span>
                  <span>฿{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className={`${styles.field} ${styles.full}`}>
                <div className={styles.errorMsg}>⚠ {error}</div>
              </div>
            )}

            <div className={`${styles.field} ${styles.full}`}>
              <button className="order-btn big" onClick={() => onSubmit()} disabled={loading}>
                {loading ? "กำลังส่ง..." : "ยืนยันพรีออเดอร์"}
              </button>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}