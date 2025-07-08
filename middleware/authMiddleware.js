const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Aucun token fourni.' });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.volunteer_id, email: decoded.email };
        next();
    } catch (err) {
        console.error('Erreur token:', err);
        res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
};

module.exports = verifyToken;
