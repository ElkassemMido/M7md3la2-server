const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3002;

// إعداد قاعدة البيانات
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'hamza'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// إعداد الـ CORS للسماح بالوصول من الواجهة الأمامية
app.use(cors());

// إعداد body-parser لتحليل البيانات القادمة من الـ front-end
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// إعداد المجلد العام
app.use(express.static(path.join(__dirname, '../')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// استرجاع المستخدمين من قاعدة البيانات
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
app.get('/record', (req, res) => {
    const sql = 'SELECT * FROM records';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
// تسجيل الدخول
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // تحقق من بيانات تسجيل الدخول من قاعدة البيانات
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'خطأ في الخادم' });
        } else if (results.length > 0) {
            // يمكنك هنا حفظ الجلسة أو بعض المعلومات للمتابعة لاحقًا
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'بيانات تسجيل الدخول غير صحيحة' });
        }
    });
});

// تشغيل السيرفر
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
