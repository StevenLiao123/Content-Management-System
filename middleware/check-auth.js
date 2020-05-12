const jwt = require('jsonwebtoken');

// used to check the token
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY, null);
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            data: {
                message: 'Sorry, the token is expired, please sign in again',
                status: "0"
            }
        });
    }
}