
//function for admin verifiication
require('dotenv').config();
exports.verifyAdmin = (req, res, next) => {
    const apiKey = req.headers['adminkey'];
    if (apiKey === process.env.ADMIN_API_KEY) {
        next();
    } else {
        res.status(400).json({ message: 'Forbidden' });
    }
};

