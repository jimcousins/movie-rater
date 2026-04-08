// server.js

const express = require('express');
const fs      = require('fs');
const path    = require('path');
const cors    = require('cors');  // ← move up here

const app     = express();
const PORT    = 3000;
const DB_FILE = path.join(__dirname, 'users.json');

app.use(cors());          // ← then use it here
app.use(express.json());
app.use(express.static(__dirname));



function getSavedUsers() {
    if (!fs.existsSync(DB_FILE)) return {};
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function saveUsers(users) {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
}


app.post('/signup', (req, res) => {
    const { firstName, lastName, email, password, securityQuestion, securityAnswer } = req.body;

    const users    = getSavedUsers();
    const emailKey = email.toLowerCase();

    if (users[emailKey]) {
        return res.status(400).json({ error: 'An account with this email already exists' });
    }

    users[emailKey] = {
        firstName,
        lastName,
        email:    emailKey,
        password,
        question: securityQuestion,
        answer:   securityAnswer.toLowerCase()
    };

    saveUsers(users);
    res.json({ success: true });
});



app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const users       = getSavedUsers();
    const matchedUser = users[email.toLowerCase()];

    if (!matchedUser || matchedUser.password !== password) {
        return res.status(401).json({ error: 'Incorrect email or password' });
    }

    res.json({ success: true, user: matchedUser });
});



app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));