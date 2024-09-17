
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if(!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        req.user = user;
        next();
    } catch(err){
        res.status(401).json({ message: 'You need to be authentified' });
    }
}

module.exports = authMiddleware;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzI2NTcyODAzLCJleHAiOjE3MzQzNDg4MDN9.u9teTa3U9RH8tm5BRz70DvRE3zSvVG9XzeXL53XzVl4