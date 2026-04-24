import { useState } from "react";

// URL สำหรับ Backend (ถ้ามี) หรือ n8n Webhook
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
// แนะนำให้เพิ่ม URL ของ n8n ในไฟล์ .env เป็น VITE_N8N_WEBHOOK_URL
const N8N_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || "https://agencipal.app.n8n.cloud/webhook/anotherway-preoder";

export function usePreOrder() {
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", note: "" });
  const [step, setStep] = useState("product"); // "product" | "form" | "success"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  const proceedToForm = () => {
    if (!selectedSize) {
      setError("กรุณาเลือกไซส์ก่อนดำเนินการต่อ");
      // เลื่อนหน้าจอไปที่จุดเลือกไซส์เพื่อให้ผู้ใช้เห็น
      document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setError("");
    setStep("form");
  };

  const submitOrder = async (slipData = null) => {
    // Validation เบื้องต้น
    if (!selectedSize) { setError("กรุณาเลือกไซส์"); return; }
    if (!form.name || !form.phone || !form.address) {
      setError("กรุณากรอกข้อมูล ชื่อ-เบอร์โทร และที่อยู่ให้ครบถ้วน");
      return;
    }

    // ถ้ายังไม่มีสลิป (เพิ่งกดปุ่มยืนยันจากหน้าฟอร์ม)
    if (!slipData && step === "form") {
      setOrderId(`AW-${Date.now()}-${Math.floor(Math.random() * 1000)}`);
      setStep("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // ถ้ามีสลิปแล้ว (กดยืนยันจากหน้าจ่ายเงิน)
    setError("");
    setLoading(true);

    const payload = {
      orderId: orderId,
      productName: "The Mad Genius Vol.1",
      size: selectedSize,
      quantity: qty,
      unitPrice: 790,
      totalPrice: 790 * qty,
      currency: "THB",
      customer: {
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        note: form.note || "-",
        timestamp: new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })
      },
      slipImage: slipData, // ส่งรูปสลิปแบบ Base64
      lineMessage: `\n📦 ออเดอร์ใหม่! (จ่ายแล้ว)\n----------------------\nคุณ: ${form.name}\nโทร: ${form.phone}\nไซส์: ${selectedSize}\nจำนวน: ${qty} ตัว\nยอดรวม: ฿${(790 * qty).toLocaleString()}\n----------------------\nที่อยู่: ${form.address}`
    };

    try {
      const n8nRes = await fetch(N8N_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!n8nRes.ok) throw new Error("ไม่สามารถส่งข้อมูลไปยังระบบได้");

      // แจ้งความสำเร็จ
      alert("ส่งข้อมูลการสั่งซื้อและสลิปเรียบร้อยแล้วครับ! ขอบคุณครับ");
      reset();

    } catch (e) {
      setError("ขออภัย ระบบขัดข้อง: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep("product");
    setSelectedSize("");
    setQty(1);
    setForm({ name: "", phone: "", email: "", address: "", note: "" });
    setOrderId("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    selectedSize,
    setSelectedSize,
    qty,
    setQty,
    form,
    setForm,
    step,
    loading,
    error,
    orderId,
    proceedToForm,
    submitOrder,
    reset,
  };
}