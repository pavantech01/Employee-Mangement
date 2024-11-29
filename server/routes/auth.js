    const express = require('express');
    const router = express.Router();
    const jwt = require('jsonwebtoken');
    const User = require('../models/User');

    router.post('/api/login', async (req, res) => {
        const { username, password } = req.body;
        console.log('Login attempt:', { username, password });

        try {
            let user = await User.findOne({ username });
            console.log('User found:', user ? 'Yes' : 'No');
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials or user not found' });
            }

            const isMatch = await user.comparePassword(password);
            console.log('Password match:', isMatch ? 'Yes' : 'No');
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error("Login Error",err.message);
            res.status(500).send('Server error');
        }
    });

    router.post('/api/register', async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = new User({ username, password });
            await user.save();
            console.log("User created successfully")
            res.json({ message: 'User created successfully' });
        } catch (err) {
            console.error("User creation failed",err);
            res.status(500).json({ message: 'Error creating user' });
        }
    });

    module.exports = router;
