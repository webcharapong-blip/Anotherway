const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

process.on('uncaughtException', function (err) {
  console.error('Caught exception: ', err);
});

try {
  app.use(cors()); 
  app.use(express.json());

  // API เดิม (เผื่อทดสอบ)
  app.post('/api/preorder', (req, res) => {
    res.status(201).json({ success: true, orderId: "AW-" + Date.now() });
  });

  // ชี้ไปยังโฟลเดอร์ dist เสมอ ไม่ว่ารันจากที่ไหน
  const webDistPath = path.join(__dirname, 'dist');
  app.use(express.static(webDistPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(webDistPath, 'index.html'), err => {
      if (err) res.status(500).send("Error loading index.html: " + err.message);
    });
  });

  const PORT = process.env.PORT || 5000;
  
  // Hostinger's Node (Passenger) typically works best without explicitly specifying the host,
  // or by allowing it to use the socket passed in process.env.PORT
  app.listen(PORT, (err) => {
    if (err) console.error("Error starting server:", err);
    console.log(`Server is running successfully on port ${PORT}`);
  });
} catch (error) {
  console.error("Critical error during server setup:", error);
}