const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

// استخدم cookie-parser لتحليل الكوكيز
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// إعداد الجلسة
app.use(session({
    secret: 'mySuperSecretKey12345678901234567890', // غيّر هذا إلى مفتاح سري قوي
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // إذا كنت تستخدم HTTPS، غيّرها إلى true
}));

// معالجة المسار الجذر
app.get('/', (req, res) => {
    res.send('Welcome to the Cookie Session Example!');
});

// معالجة المسار لتعيين متغير الجلسة
app.post('/set-session', (req, res) => {
    req.session.user = req.body.user; // تعيين متغير الجلسة
    res.send('Session variable set!');
});

// معالجة المسار للحصول على متغير الجلسة
app.get('/get-session', (req, res) => {
    if (req.session.user) {
        res.send(`Session variable: ${req.session.user}`);
    } else {
        res.send('No session variable found.');
    }
});

// معالجة المسار /ea/all
app.get('/ea/all', (req, res) => {
    res.send('<h1>أهلاً وسهلاً بكم في صفحة /ea/all!</h1>');
});

// تشغيل السيرفر
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
