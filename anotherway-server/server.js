const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // สำคัญมาก เพื่อแก้ปัญหา ERR_CONNECTION_REFUSED
app.use(express.json());

app.post('/api/preorder', (req, res) => {
  console.log("ได้รับออเดอร์ใหม่:", req.body);
  
  // ตรงนี้คือจุดที่คุณจะเชื่อมกับ n8n หรือบันทึกตกลง MongoDB
  // ในช่วงแรกส่งสถานะ Success กลับไปก่อนเพื่อให้หน้าเว็บทำงานต่อได้
  res.status(201).json({ success: true, orderId: "AW-" + Date.now() });
});

app.listen(5000, () => {
  console.log('Backend Server is running on http://localhost:5000');
});