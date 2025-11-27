const jwt = require('jsonwebtoken');

// Crisis.js
// Middleware de autorización para Express.js
// Verifica la presencia del token (Authorization: Bearer <token>) y lo valida.
// Si es válido adjunta los datos decodificados en req.user y llama a next().
// Si falta o es inválido devuelve 401.


const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_placeholder';

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Esperamos formato "Bearer <token>"
    const parts = authHeader.split(' ');
    const token = parts.length === 2 && /^Bearer$/i.test(parts[0]) ? parts[1] : null;
    if (!token) {
        return res.status(401).json({ message: 'Formato de token inválido' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Adjuntar información del usuario a la petición para rutas posteriores
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}

module.exports = authMiddleware;