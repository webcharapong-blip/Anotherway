import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// เสิร์ฟไฟล์ Static ทั้งหมดจากโฟลเดอร์โฟลเดอร์ dist ที่เกิดจากคำสั่ง npm run build
app.use(express.static(path.join(__dirname, 'dist')));

// สำหรับทุกๆ Request (เช่น การกด Refresh หน้าเว็บย่อย) ให้โยนกลับไปที่ index.html เสมอ 
// (สำคัญมากสำหรับการทำงานของ React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running nicely on port ${port}`);
});
