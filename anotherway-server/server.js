const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors()); // สำคัญมาก เพื่อแก้ปัญหา ERR_CONNECTION_REFUSED
app.use(express.json());

// API เดิมของเราเผื่อไว้ (เอาไว้ทดสอบได้)
app.post('/api/preorder', (req, res) => {
  console.log("ได้รับออเดอร์ใหม่:", req.body);
  res.status(201).json({ success: true, orderId: "AW-" + Date.now() });
});

// ชี้เข้าหาโฟลเดอร์ dist ที่อยู่ใน anotherway-server (ตัวมันเอง)
const webDistPath = path.join(__dirname, 'dist');

// เสิร์ฟไฟล์ Static
app.use(express.static(webDistPath));

// สำหรับรับ Request หน้าเว็บ React ย่อยต่างๆ
app.get('*', (req, res) => {
  res.sendFile(path.join(webDistPath, 'index.html'));
});

// Hostinger มักจะเจาะจง PORT ใน process.env.PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Unified Server is running on port ${PORT}`);
});