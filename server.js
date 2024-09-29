const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// إعداد الجلسة
app.use(session({
  secret: 'your-secret-key', // قم بتغيير هذه القيمة إلى مفتاح سري خاص بك
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // تأكد من ضبط secure على true في بيئة الإنتاج
}));

// نقطة النهاية لتسجيل الدخول
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // تحقق من بيانات الاعتماد (يمكنك استبدال هذا بالتحقق الفعلي)
  if (username === 'admin' && password === 'password') {
    req.session.user = username;
    res.send('Logged in');
  } else {
    res.status(401).send('Unauthorized');
  }
});

// نقطة النهاية لتسجيل الخروج
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Could not log out');
    }
    res.send('Logged out');
  });
});

// نقطة النهاية الرئيسية
app.get('/', (req, res) => {
  if (req.session.user) {
    res.send(`Hello, ${req.session.user}`);
  } else {
    res.send('Welcome! Please log in.');
  }
});

// بدء السيرفر
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
