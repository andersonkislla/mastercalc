const jwt = require('jsonwebtoken');

// Middleware que verifica se o token é válido
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado, token não fornecido!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Adiciona as informações do usuário ao request
        next();  // Passa para a próxima função ou rota
    } catch (error) {
        return res.status(400).json({ message: 'Token inválido!' });
    }
};

module.exports = authenticateToken;
