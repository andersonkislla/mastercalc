const express = require('express');
const Procedure = require('../models/Procedure');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Criar procedimento (somente admin)
router.post('/', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acesso negado, apenas administradores podem criar procedimentos.' });
    }

    const { brand, ecu_type, title, description, procedure_script } = req.body;

    try {
        const newProcedure = new Procedure({
            brand,
            ecu_type,
            title,
            description,
            procedure_script,
        });

        await newProcedure.save();
        res.status(201).json(newProcedure);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao salvar procedimento' });
    }
});

// Listar todos os procedimentos
router.get('/', async (req, res) => {
    try {
        const procedures = await Procedure.find();
        res.status(200).json(procedures);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar procedimentos' });
    }
});

module.exports = router;
