const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure session
app.use(session({
    secret: 'your-secret-key', // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.get('/', (req, res) => {
    res.send('Welcome to the Cookie Session Example!');
});

// Route to set a session variable
app.post('/set-session', (req, res) => {
    req.session.user = req.body.user; // Set session variable
    res.send('Session variable set!');
});

// Route to get a session variable
app.get('/get-session', (req, res) => {
    if (req.session.user) {
        res.send(`Session variable: ${req.session.user}`);
    } else {
        res.send('No session variable found.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
