require('dotenv').config();
const jwt = require('jsonwebtoken');
// basic requirement for auth

//verify token function--> used in middleware

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Access denied' });
    // console.log(authHeader);
    try {
        const user = jwt.verify(authHeader, process.env.SECRET_KEY);
        console.log(user);
        req.user = user;
        console.log(user);
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Invalid token' });
    }
};


