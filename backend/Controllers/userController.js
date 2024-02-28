const User = require("../Models/User");
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Register a User
const registerUser = asyncHandler(async (req, res) => {
    const { u_name, u_email, u_password } = req.body;

    if (!u_name || !u_email || !u_password) {
        res.status(400);
        res.status(400).json({ error: "Please fill all the fields" });
    }

    const userExists = await User.findOne({ u_email });

    if (userExists) {
        res.status(400);
        res.status(400).json({ error: "User already exists" });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(u_password, 10);

    const user = await User.create({
        u_name,
        u_email,
        u_password: hashedPassword
    });

    console.log(`User created ${user}`);
    if (user) {
        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, userEmail: user.u_email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            _id: user.id,
            u_name: user.u_name,
            u_email: user.u_email,
            token: token
        });
    } else {
        res.status(400).json({ error: "User Not Created" });
    }
});

//Login User
const loginUser = asyncHandler(async (req, res) => {
    const { u_email, u_password } = req.body;

    if (!u_email || !u_password) {
        res.status(400).json({ error: "Please fill all the fields" });
    }

    const user = await User.findOne({ u_email });

    if (user && (await bcrypt.compare(u_password, user.u_password))) {
        const token = jwt.sign(
            { userId: user._id, userEmail: user.u_email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            _id: user.id,
            u_name: user.u_name,
            u_email: user.u_email,
            token: token
        });
    } else {
        res.status(401).json({ error: "Invalid Credentials" });
    }
})

module.exports = {
    registerUser, loginUser
};
