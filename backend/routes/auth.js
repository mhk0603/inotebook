const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'Mahek@tha';

//  ROUTE 1 - Create a user using: POST "/api/auth/createuser". Doesn't require login
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt); // await as it returns a promise

        // Create a new user
        const user = await User.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            }
        );

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);

        success=true
        res.json({ success, authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});



// ROUTE 2 - Aunthenticating a user using: POST "/api/auth/login". Doesn't require login

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    let success = false

    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false
            return res.status(400).json({success, error: "Please try to login with correct credentials" });

        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success= true
        res.json({ success, authToken })


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }


})



// ROUTE 3 - Get logged in user details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");

    }
})




module.exports = router;
