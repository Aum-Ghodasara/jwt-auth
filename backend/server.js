require('dotenv').config(); 

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET; 
const users = []; 

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1m' });
    res.json({ token, message: 'Login successful' });
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) return res.status(401).json({ message: 'No token provided.' });

    jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
        if (err) return res.status(403).json({ message: 'Token expired or invalid.' });
        req.user = decodedUser; 
        next();
    });
};

app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ 
        message: `Welcome, ${req.user.username}!`,
        secretData: "This is secure data from the Express server."
    });
});

app.listen(3000, () => console.log('Backend running on port 3000'));