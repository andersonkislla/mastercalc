const express = require('express');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Rota para adicionar um novo usuário (somente admin)
router.post('/', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acesso negado, somente administradores podem criar usuários.' });
    }

    const { username, password, role } = req.body;

    try {
        const newUser = new User({
            username,
            password,  // Aqui você deve considerar o uso de hash para as senhas
            role,
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
});

// Rota para remover um usuário (somente admin)
router.delete('/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acesso negado, apenas administradores podem remover usuários.' });
    }

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        await user.remove();
        res.status(200).json({ message: 'Usuário removido com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover usuário' });
    }
});

module.exports = router;
