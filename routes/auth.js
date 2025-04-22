const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Modelo do usuário (ajuste conforme sua estrutura)
const router = express.Router();

// Rota de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {  // Isso pode ser melhorado com hashing de senha
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar login' });
    }
});

module.exports = router;
