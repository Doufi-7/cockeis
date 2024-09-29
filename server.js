const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const PORT = 3000;

// إعداد الكوكيز والجلسات
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key', // تأكد من تغيير المفتاح إلى شيء قوي
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // يجب أن يكون true في بيئة الإنتاج مع HTTPS
}));

// نقطة النهاية لتسجيل الدخول
app.post('/login', (req, res) => {
    // من المفترض التحقق من بيانات الاعتماد هنا
    req.session.user = { id: 1, name: 'User' }; // تخزين معلومات المستخدم في الجلسة
    res.send('Logged in!');
});

// نقطة النهاية للتحقق من الجلسة
app.get('/session', (req, res) => {
    if (req.session.user) {
        res.send(`Welcome back, ${req.session.user.name}`);
    } else {
        res.send('You are not logged in.');
    }
});

// بدء الخادم
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
