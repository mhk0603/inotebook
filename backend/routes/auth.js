const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Mahek@tha';

// Create a user using: POST "/api/auth/createuser". Doesn't require Authentication
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt); // await as it returns a promise

        // Create a new user
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        
        res.json({authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occurred");
    }
});

module.exports = router;
