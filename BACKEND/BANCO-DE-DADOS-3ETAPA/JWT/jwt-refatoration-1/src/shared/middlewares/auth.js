import { verifyAccessToken } from '../lib/jwt.js';

export function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']; // formato: Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}

export function verifyAdmin(req, res, next) {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Administrator access required' });
    }
    next();
}